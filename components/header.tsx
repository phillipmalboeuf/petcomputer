

import React, { SFC } from 'react'
import { Text, Alert, View } from 'react-native'
import { Link, RouteComponentProps } from 'react-router-native'

import { window, rythm, colors } from '../styles/settings'

interface Props extends RouteComponentProps {}
interface State {}

export class Header extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
    }
  }

  public render() {
    return <View style={{
      position: 'absolute',
      top: 0,
      width: window().width,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.black,
      paddingTop: rythm*1.333
    }}>
      <Link style={{
        padding: rythm
      }} to='/account'>
        <Text style={{
          color: colors.white,
          fontSize: rythm/1.333,
          lineHeight: rythm
        }}>Account</Text>
      </Link>
    </View>
  }
}