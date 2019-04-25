
import React, { SFC } from 'react'
import { Button as NButton, NativeSyntheticEvent, NativeTouchEvent, StyleSheet, TouchableHighlight, Text } from 'react-native'
import { colors, rythm } from '../styles/settings'

export const Button: SFC<{
  label: string
  onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void
  secondary?: boolean
  disabled?: boolean
}> = props => {
  return <TouchableHighlight style={{
    alignItems: 'center',
    backgroundColor: props.secondary ? colors.grey : colors.black,
    paddingVertical: rythm/1.666,
    paddingHorizontal: rythm,
    borderRadius: rythm
  }} onPress={props.onPress} disabled={props.disabled}>
    <Text style={{
      color: colors.white
    }}>{props.label}</Text>
  </TouchableHighlight>
}