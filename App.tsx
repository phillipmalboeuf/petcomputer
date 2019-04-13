
import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button, Alert } from 'react-native'
import { NativeRouter, Route, BackButton, Link, Switch } from 'react-router-native'
import { Stitch, StitchUser, StitchAppClient, UserPasswordCredential, RemoteMongoDatabase } from 'mongodb-stitch-react-native-sdk'

import { db, StitchContext, stitch } from './clients/stitch'

import { Form } from './components/form'
import { Input } from './components/input'

import GPSs from './routes/gpss'


interface Props {}
interface State {
  user: StitchUser
  client: StitchAppClient
  db: RemoteMongoDatabase
}
export default class App extends Component<Props, State> {

  appcontext = React.createContext({})
  
  constructor(props: Props) {
    super(props)
    this.state = {
      user: undefined,
      client: undefined,
      db: undefined
    }
  }

  componentDidMount() {
    this.load()
  }

  public load() {
    stitch.then(client => {
      this.setState({ client, db: db(client) })

      if(client.auth.isLoggedIn) {
        this.setState({ user: client.auth.user })
      }
    })
  }

  render() {
    return <StitchContext.Provider value={{
      user: this.state.user,
      db: this.state.db
    }}>
      <View style={styles.container}>
        <Text style={styles.welcome}>pet.computer</Text>
        {this.state.user 
        ? <>
          <Text>Hi {this.state.user.id}</Text>
          <NativeRouter>
            <BackButton>
              <Link to='/collars'><Text>Collars</Text></Link>
              <Link to='/gpss'><Text>GPSs</Text></Link>
              <Link to='/doors'><Text>Doors</Text></Link>
              <Link to='/feeds'><Text>Feeds</Text></Link>
              
              <Switch>
                <Route exact path='/collars' />
                <Route exact path='/gpss' component={GPSs} />
                <Route exact path='/doors' />
                <Route exact path='/feeds' />
              </Switch>

            </BackButton>
          </NativeRouter>
          <Button title='Logout' onPress={e => this.state.client.auth.logout().then(user => this.setState({ user: undefined }))} />
        </>
        : <>
          <Form onSubmit={async values => {
            // Alert.alert(JSON.stringify(values))
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
    </StitchContext.Provider>
  }
}

export const styles = StyleSheet.create({
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