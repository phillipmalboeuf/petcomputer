
import React, { SFC } from 'react'
import { Button as NButton, NativeSyntheticEvent, NativeTouchEvent, StyleSheet, Text } from 'react-native'
import { colors, rythm } from '../styles/settings'

export const Paragraph: SFC<{
}> = props => {
 return <Text style={{
   color: colors.black,
   fontSize: rythm,
   lineHeight: rythm
 }}>
   {props.children}
 </Text>
}

export const Title: SFC<{
}> = props => {
 return <Text style={{
   color: colors.black,
   fontSize: rythm*2,
   textAlign: 'center',
   lineHeight: rythm*2
 }}>
   {props.children}
 </Text>
}