import React, { SFC } from 'react'
import { Button as NButton, NativeSyntheticEvent, NativeTouchEvent, StyleSheet, View } from 'react-native'
import { colors, rythm, window } from '../styles/settings'

export const Padded: SFC<{
  
}> = props => {
  return <View style={{
    padding: rythm
  }}>
    {props.children}
  </View>
}

export const Marginalized: SFC<{
  top?: boolean
  bottom?: boolean
}> = props => {
  return <View style={{
    marginTop: props.top && rythm/3.33,
    marginBottom: props.bottom && rythm/3.33
  }}>
    {props.children}
  </View>
}

export const Middle: SFC<{
  
}> = props => {
  return <View style={{
    flex: 1,
    justifyContent: 'center'
  }}>
    {props.children}
  </View>
}

export const Full: SFC<{
  
}> = props => {
  return <View style={{
    flex: 1,
    paddingTop: rythm*5
  }}>
    {props.children}
  </View>
}

export const BottomRight: SFC<{
  
}> = props => {
  return <View style={{
    position: 'absolute',
    bottom: rythm*4,
    right: 0,
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: rythm/2,
    paddingVertical: rythm
  }}>
    {props.children}
  </View>
}