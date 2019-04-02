
import React from 'react'
import { FormContext } from './form'
import { TextInput, KeyboardTypeOptions, TextInputProps, Text } from 'react-native'

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
      {props.label && <Text key="label">{props.label}{props.optional ? " (Optional)" : "" }</Text>}
      <TextInput onChangeText={text => context.onChange(props.name, text)}
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