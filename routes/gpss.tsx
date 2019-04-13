
import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button, Alert, TouchableHighlight, Modal, FlatList } from 'react-native'
import { NativeRouter, Route, BackButton, Link, RouteComponentProps } from 'react-router-native'
import { Stitch, StitchUser, AnonymousCredential, StitchAppClient, UserPasswordCredential } from 'mongodb-stitch-react-native-sdk'
import { ObjectId } from 'bson'

import { Form } from '../components/form'
import { Input } from '../components/input'
import { styles } from '../App'

import { StitchContext } from '../clients/stitch'

interface GPSDocument {
  _id: ObjectId
  name: string
}

interface Props extends RouteComponentProps {}
interface State {
  inserting: boolean
  gpss: GPSDocument[]
  map: boolean | ObjectId
}

export default class GPSs extends Component<Props, State> {

  static contextType = StitchContext
  context!: React.ContextType<typeof StitchContext>
  
  constructor(props: Props) {
    super(props)
    this.state = {
      inserting: false,
      gpss: undefined,
      map: false
    }
  }
  
  async componentDidMount() {
    this.setState({
      gpss: await this.context.db.collection<GPSDocument>('gpss').find().toArray()
    })
  }

  render() {
    return (
      <View>
        <Text>GPSs</Text>

        {/* {this.state.gpss && <FlatList data={this.state.gpss}
          keyExtractor={(item, index) => item._id.toHexString()}
          renderItem={({ item })=> <Text>{item.name}</Text>} />} */}
        {this.state.gpss && this.state.gpss.map(gps => <TouchableHighlight key={gps._id.toHexString()}
          onPress={_ => this.setState({ map: gps._id })}>
          <Text>{gps.name}</Text>
        </TouchableHighlight>)}

        <Modal
          animationType='slide'
          transparent={false}
          visible={!!this.state.map}>
          <View style={styles.container}>
            


            <TouchableHighlight
              onPress={() => {
                this.setState({ map: false })
              }}>
              <Text>Hide Map</Text>
            </TouchableHighlight>
          </View>
        </Modal>

        <Modal
          animationType='slide'
          transparent={true}
          visible={this.state.inserting}>
          <View style={styles.container}>
            <Form onSubmit={values => {
              return this.context.db.collection('gpss').insertOne({
                ...values,
                owner_id: this.context.user.id
              }).then(result => <Text>
                Successfully added {values.name}!
              </Text>)
            }}>
              <Text>New GPS</Text>
              <Input name='name' label='Name' placeholder={`Isaac\'s GPS`} />
            </Form>

            <TouchableHighlight
              onPress={() => {
                this.setState({ inserting: false })
              }}>
              <Text>Hide Form</Text>
            </TouchableHighlight>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setState({
              inserting: true
            })
          }}>
          <Text>New GPS</Text>
        </TouchableHighlight>
      </View>
    )
  }
}