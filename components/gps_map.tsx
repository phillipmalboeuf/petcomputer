

import React from 'react'
import { Platform, Button, Text, Alert, View, StyleSheet } from 'react-native'
import MapView, { Marker, Circle, UrlTile } from 'react-native-maps'


interface Props {
  find?: string,
  markers?: {
    id: string
    name: string
    coordinates: {
      latitude: number,
      longitude: number
    }
  }[]
}
interface State {
}

export class GPSMap extends React.Component<Props, State> {

  map_view: MapView

  constructor(props: Props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {

  }

  public render() {
    return <View style={styles.container}>
      <MapView ref={element => this.map_view = element}
        style={styles.map} showsUserLocation showsMyLocationButton showsTraffic={false} mapType='mutedStandard'
        onMapReady={()=> { this.map_view.fitToSuppliedMarkers(this.props.find ? [this.props.find] : this.props.markers.map(marker => marker.id), { animated: false }) }}>

        {Platform.OS === 'android' && <UrlTile urlTemplate='https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png' />}

        {this.props.markers && this.props.markers.map(marker => <React.Fragment key={marker.id}>
          
          <Circle center={marker.coordinates} radius={4} fillColor={'rgba(0, 0, 0, 0.2)'} />
          <Circle center={marker.coordinates} radius={1} fillColor={'black'} />
          <Marker identifier={marker.id} coordinate={marker.coordinates} centerOffset={{ x: 0, y: -20 }}>
            <Text>{marker.name}</Text>
          </Marker>

        </React.Fragment>)}
      </MapView>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})