
import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Alert, TouchableHighlight, Modal, FlatList } from 'react-native'
import { NativeRouter, Route, BackButton, Link, RouteComponentProps } from 'react-router-native'
import { Stitch, StitchUser, AnonymousCredential, StitchAppClient, UserPasswordCredential } from 'mongodb-stitch-react-native-sdk'
import { ObjectId } from 'bson'

import { StitchContext } from '../clients/stitch'
import { rythm } from '../styles/settings'

import { Form } from '../components/form'
import { Input } from '../components/input'
import { Map } from '../components/map'
import { Middle, BottomRight, Marginalized, Full, Padded } from '../components/layout'
import { Button } from '../components/button'
import { List } from '../components/list'
import { Title } from '../components/text'


export interface GPSDocument {
  _id: ObjectId
  name: string
  device_id: string
  latitude: number
  longitude: number
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

  private heartbeat: NodeJS.Timeout
  
  constructor(props: Props) {
    super(props)
    this.state = {
      inserting: false,
      gpss: undefined,
      map: false
    }
  }
  
  async componentDidMount() {
    this.fetchCollection()
    this.heartbeat = setInterval(_ => {
      this.state.map && this.fetchCollection()
    }, 2000)
  }

  componentWillUnmount() {
    clearInterval(this.heartbeat)
  }

  public async fetchCollection() {
    const collection = this.context.db.collection<GPSDocument>('gpss')
    const gpss = await collection.find().toArray()
    
    this.setState({ gpss })

    // collection.watch(gpss.map(gps => gps._id))
  }

  render() {
    return (<>
      <Full>
        {this.state.gpss && <>

          <List title='GPSs' items={this.state.gpss.map(gps => ({
            body: <Text>{gps.name}</Text>,
            onPress: ()=> this.setState({ map: gps.device_id ? gps._id : true })
          }))} />
        
          <Modal
            animationType='slide'
            transparent={false}
            visible={!!this.state.map}>
            <View style={{ flex: 1, justifyContent: 'flex-end', padding: rythm*2 }}>
              
              <Map find={typeof this.state.map !== 'boolean' ? this.state.map.toHexString() : undefined} markers={this.state.gpss.filter(gps => gps.device_id)} />

              <Button
                onPress={() => {
                  this.setState({ map: false })
                }} label='Hide Map' />
            </View>
          </Modal>
        </>}

        

        <Modal
          animationType='slide'
          visible={this.state.inserting}>
          <Full>
            <Padded>
              <Form onSubmit={values => {
                return this.context.db.collection('gpss').insertOne({
                  ...values,
                  owner_id: this.context.user.id
                }).then(result => <Text>
                  Successfully added {values.name}!
                </Text>)
              }}>
              
                <Marginalized bottom><Title>New GPS</Title></Marginalized>
                <Input name='name' label='Name' placeholder={`Isaac\'s GPS`} />
              </Form>
            </Padded>
            <Padded>
              <Button secondary label='Hide Form'
                onPress={() => {
                  this.setState({ inserting: false })
                }} />
            </Padded>
          </Full>
        </Modal>
      </Full>
      
      <BottomRight>
        <Marginalized bottom>
          <Button secondary label='New GPS'
            onPress={() => {
              this.setState({
                inserting: true
              })
            }} />
        </Marginalized>

        {this.state.gpss && <Button label='Show Map'
          onPress={() => {
            this.setState({ map: true })
          }} />}
      </BottomRight>
    </>)
  }
}
