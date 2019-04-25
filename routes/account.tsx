
import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Alert, TouchableHighlight, Modal, FlatList } from 'react-native'
import { NativeRouter, Route, BackButton, Link, RouteComponentProps } from 'react-router-native'
import { ObjectId } from 'bson'

import { StitchContext } from '../clients/stitch'
import { rythm } from '../styles/settings'

import { Form } from '../components/form'
import { Input } from '../components/input'
import { Map } from '../components/map'
import { Middle, Padded, Full } from '../components/layout'
import { Button } from '../components/button'


interface Props extends RouteComponentProps {}
interface State {
}

export default class Account extends Component<Props, State> {

  static contextType = StitchContext
  context!: React.ContextType<typeof StitchContext>

  
  constructor(props: Props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (<Full>
      <Padded>
        {/* <Text>Hi {this.state.user.id}</Text> */}
        <Button label='Logout' onPress={e => this.context.logout()} />
      </Padded>
    </Full>)
  }
}
