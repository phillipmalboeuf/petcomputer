
import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button, Alert } from 'react-native'
import { Stitch, StitchUser, AnonymousCredential, StitchAppClient, UserPasswordCredential } from 'mongodb-stitch-react-native-sdk'

import { Form } from './components/form'
import { Input } from './components/input'


interface Props {}
interface State {
  user: StitchUser,
  client: StitchAppClient
}
export default class App extends Component<Props, State> {
  
  constructor(props: Props) {
    super(props)
    this.state = {
      user: undefined,
      client: undefined
    }
  }

  componentDidMount() {
    this.load()
  }

  public load() {
    Stitch.initializeDefaultAppClient('petcomputer-mpyuf').then(client => {
      this.setState({ client })

      if(client.auth.isLoggedIn) {
        this.setState({ user: client.auth.user })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>pet.computer</Text>
        {this.state.user 
        ? <>
          <Text>Hi {this.state.user.id}</Text>
          <Button title='Logout' onPress={e => this.state.client.auth.logout().then(user => this.setState({ user: undefined }))} />
        </>
        : <>
          <Form onSubmit={async values => {
            Alert.alert(JSON.stringify(values))
            const user = await this.state.client.auth.loginWithCredential(new UserPasswordCredential(values.email, values.password))
            this.setState({
              user
            })
          }}>
            <Input type='email' name='email' label='Email address' placeholder='your.address@gmail.com' />
            <Input type='newpassword' name='password' label='New password' placeholder='********' />
          </Form>
        </>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})