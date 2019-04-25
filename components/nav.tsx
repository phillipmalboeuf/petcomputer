

import React, { SFC } from 'react'
import { Text, Alert, View } from 'react-native'
import { Link, RouteComponentProps } from 'react-router-native'

import { window, rythm, colors } from '../styles/settings'

interface Props extends RouteComponentProps {}
interface State {}

export class Nav extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
    }
  }

  public render() {
    return <View style={{
      position: 'absolute',
      bottom: 0,
      width: window().width,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      backgroundColor: colors.black,
      paddingBottom: rythm
    }}>
      <NavLink active={this.props.location.pathname === '/collars'} to='/collars' label='Collars' />
      <NavLink active={this.props.location.pathname === '/gpss'} to='/gpss' label='GPSs' />
      <NavLink active={this.props.location.pathname === '/doors'} to='/doors' label='Doors' />
      <NavLink active={this.props.location.pathname === '/feeds'} to='/feeds' label='Feeds' />
    </View>
  }
}

export const NavLink: SFC<{
  to: string,
  label: string,
  active?: boolean
}> = props => {
 return <Link style={{
    padding: rythm,
    borderTopColor: props.active ? colors.white : 'transparent',
    borderTopWidth: 2
  }} to={props.to}>
  <Text style={{
    color: props.active ? colors.white : colors.grey,
    fontSize: rythm/1.333,
    lineHeight: rythm
  }}>
    {props.label}
  </Text>
</Link>
}