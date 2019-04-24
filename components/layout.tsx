import React, { SFC } from 'react'
import { Button as NButton, NativeSyntheticEvent, NativeTouchEvent, StyleSheet, View } from 'react-native'
import { colors, rythm } from '../styles/settings'

export const Padded: SFC<{
  
}> = props => {
  return <View style={{
    padding: rythm
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