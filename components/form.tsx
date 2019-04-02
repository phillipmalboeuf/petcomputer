

import React from 'react'
import { Button, Text } from 'react-native';


export const FormContext = React.createContext({
  values: {} as { [key:string]: any },
  onChange: function(name: string, value: any): void {},
})


interface Props {
  cta?: string,
  onSubmit: (values: { [key:string]: any })=> Promise<string | JSX.Element | void>
}
interface State {
  values: { [key:string]: any },
  waiting: boolean,
  response?: string | JSX.Element,
  error?: string | JSX.Element
}

export class Form extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      values: {},
      waiting: false
    }
  }

  async onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    this.setState({
      waiting: true,
      error: undefined
    })

    this.props.onSubmit(this.state.values).then(response => this.setState({
        response: response || undefined,
        waiting: false
      })).catch(error => this.setState({
        error: error.message,
        waiting: false
      }))
  }

  onChange(name: string, value: any) {
    this.setState({
      values : {
        ...this.state.values,
        [name]: value
      }
    })
  }

  public render() {
    return this.state.response
    ? this.state.response
    : <>
      <FormContext.Provider value={{
        onChange: this.onChange.bind(this),
        values: this.state.values
      }}>
        {this.props.children}
      </FormContext.Provider>
      {this.state.error && <Text>{this.state.error}</Text>}
      <Button onPress={e => this.props.onSubmit(this.state.values)} disabled={this.state.waiting} title={this.state.waiting ? 'One moment...' : this.props.cta || 'Save'} />
    </>
  }
}