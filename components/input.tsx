
import React from 'react'
import { FormContext } from './form'
import { TextInput, KeyboardTypeOptions, TextInputProps, Text } from 'react-native'

import { rythm, colors } from '../styles/settings'


interface Props {
  name: string,
  placeholder?: string,
  value?: any,
  type?: 'email' | 'password' | 'newpassword' | 'phone' | 'number' | 'url',
  label?: string,
  optional?: boolean,
  disabled?: boolean,
  autoFocus?: boolean,
  autoComplete?: string,
  submitter?: boolean
}

export const Input: React.SFC<Props> = (props) => {
  return <FormContext.Consumer>
    {(context) => <>
      {props.label && <Text style={{
          marginBottom: rythm/2
        }}>{props.label}{props.optional ? ' (Optional)' : '' }</Text>}
      <TextInput
        style={{
          fontSize: rythm,
          padding: rythm/2,
          marginBottom: rythm,
          borderBottomColor: colors.black,
          borderBottomWidth: 2
        }}
        onChangeText={text => context.onChange(props.name, text)}
        defaultValue={props.value}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus}
        autoCapitalize={'none'}
        autoCorrect={false}
        editable={!props.disabled}
        blurOnSubmit={props.submitter}
        secureTextEntry={props.type === 'password' || props.type === 'newpassword'}
        keyboardType={({
          email: 'email-address',
          phone: 'phone-pad',
          number: 'numeric',
          url: 'url'
        } as {[key: string]: KeyboardTypeOptions})[props.type]}
        textContentType={({
          email: 'emailAddress',
          password: 'password',
          newpassword: 'newPassword',
          phone: 'telephoneNumber',
          url: 'URL'
        } as {[key: string]: TextInputProps['textContentType']})[props.type]} />
    </>}
  </FormContext.Consumer>
}