

import React, { SFC } from 'react'
import { Text, Alert, View, NativeSyntheticEvent, NativeTouchEvent, SectionList } from 'react-native'
import { Link, RouteComponentProps } from 'react-router-native'

import { window, rythm, colors } from '../styles/settings'

interface ListItemProps {
  body: Element
  to?: string
  onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void
}

interface Props {
  title?: string
  items?: ListItemProps[]
}
interface State {}

export class List extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
    }
  }

  public render() {
    return <SectionList
      renderItem={({item, index, section}) => <ListItem key={index} body={item.body} to={item.to} onPress={item.onPress} />}
      renderSectionHeader={({section: {title}}) => (<View style={{
        paddingVertical: rythm/2,
        paddingHorizontal: rythm
      }}>
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
      </View>)} sections={[
        { title: this.props.title, data: this.props.items }
      ]}
      keyExtractor={(item, index) => item + index} />
  }
}

export const ListItem: SFC<ListItemProps> = props => {
 return <Link style={{
    paddingVertical: rythm/2,
    paddingHorizontal: rythm
  }} to={props.to} onPress={props.onPress}>
  {props.body}
</Link>
}