
import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Alert, Image, StatusBar } from 'react-native'
import { NativeRouter, Route, BackButton, Link, Switch, RouteComponentProps } from 'react-router-native'
import { Stitch, StitchUser, StitchAppClient, UserPasswordCredential, RemoteMongoDatabase } from 'mongodb-stitch-react-native-sdk'

import { db, StitchContext, stitch } from './clients/stitch'

import GPSs from './routes/gpss'
import Account from './routes/account'

import { rythm } from './styles/settings'

import { Form } from './components/form'
import { Input } from './components/input'
import { Button } from './components/button'
import { Title } from './components/text'
import { Padded, Middle } from './components/layout'
import { Nav } from './components/nav'
import { Header } from './components/header'


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

  public logout() {
    this.state.client.auth.logout().then(user => this.setState({ user: undefined }))
  }

  render() {
    return <StitchContext.Provider value={{
      user: this.state.user,
      db: this.state.db,
      logout: this.logout.bind(this)
    }}>
      <>
        <StatusBar barStyle='light-content' />

        {this.state.user 
        ? <>
          <NativeRouter>
            <BackButton>              
              <Switch>
                {/* <Route exact path='/' component={GPSs} /> */}
                <Route exact path='/collars' />
                <Route exact path='/gpss' component={GPSs} />
                <Route exact path='/doors' />
                <Route exact path='/feeds' />
                <Route exact path='/account' component={Account} />
              </Switch>
              
              <Route path='/*' component={Header} />
              <Route path='/*' component={Nav} />
            </BackButton>
          </NativeRouter>
        </>
        : <Middle>
          <Padded>
            <Image style={{ width: 'auto', resizeMode: 'contain', marginHorizontal: rythm*3 }} source={require('./images/logo.png')} />
          </Padded>
          <Padded>
            <Form cta='Login' onSubmit={async values => {
              // Alert.alert(JSON.stringify(values))
              const user = await this.state.client.auth.loginWithCredential(new UserPasswordCredential(values.email, values.password))
              this.setState({
                user
              })
            }}>
              <Input type='email' name='email' label='Email address' placeholder='your.address@gmail.com' />
              <Input type='newpassword' name='password' label='Password' placeholder='********' />
            </Form>
          </Padded>
        </Middle>}
      </>
    </StitchContext.Provider>
  }
}