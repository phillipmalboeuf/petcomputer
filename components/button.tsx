
import React, { SFC } from 'react'
import { Button as NButton, NativeSyntheticEvent, NativeTouchEvent, StyleSheet } from 'react-native'
import { colors } from '../styles/settings'

export const Button: SFC<{
  label: string
  onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void,
  disabled?: boolean
}> = props => {
  return <NButton color={colors.black} onPress={props.onPress} disabled={props.disabled} title={props.label} />
}