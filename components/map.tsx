

import React from 'react'
import { Platform, Button, Text, Alert, View, StyleSheet, Animated } from 'react-native'
import MapView, { Marker, Circle, UrlTile, MarkerAnimated } from 'react-native-maps'
import { Spring, config } from 'react-spring/renderprops-native'

import { GPSDocument } from '../routes/gpss' 


interface Props {
  find?: string,
  markers?: GPSDocument[]
}
interface State {
}

export class Map extends React.Component<Props, State> {

  map_view: MapView

  state = {}

  componentDidMount() {
    
  }

  public render() {
    return <View style={styles.container}>
      <MapView ref={element => this.map_view = element} style={styles.map}
        maxZoomLevel={19}
        showsUserLocation showsMyLocationButton showsTraffic={false}
        onMapReady={()=> { this.map_view.fitToSuppliedMarkers(this.props.find ? [this.props.find] : this.props.markers.map(marker => marker._id.toHexString()), { animated: false }) }}>

        {/* {Platform.OS === 'android' && <UrlTile urlTemplate='https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png' />} */}

        {this.props.markers && this.props.markers.map(marker => <GPSMarker key={marker._id.toHexString()}
          marker={marker} />)}
      </MapView>
    </View>
  }
}


interface GPSMarkerProps {
  marker: GPSDocument
}
interface GPSMarkerState {
}

export class GPSMarker extends React.Component<GPSMarkerProps, GPSMarkerState> {

  private marker: MarkerAnimated

  constructor(props: GPSMarkerProps) {
    super(props)
    this.state = {
    }
  }

  componentDidUpdate() {
    
  }

  static getDerivedStateFromProps(props: GPSMarkerProps, state: GPSMarkerState) {
    return state
  }

  public render() {
    const { marker } = this.props

    return !!marker.latitude && !!marker.longitude && <Spring reset config={config.molasses}
      to={{ radius: 133, latitude: marker.latitude, longitude: marker.longitude }}
      from={{ radius: 0 }}>
      {({ radius, latitude, longitude })=> <>
      <Circle center={{ latitude, longitude }} radius={radius} strokeColor={`rgba(0, 0, 0, ${1 - (radius/133)})`} />
      <Circle center={{ latitude, longitude }} radius={4} fillColor={'rgba(0, 0, 0, 0.2)'} />
      <Circle center={{ latitude, longitude }} radius={1} fillColor={'black'} />
      <MarkerAnimated ref={marker => this.marker = marker} identifier={marker._id.toHexString()} coordinate={{ latitude, longitude }} centerOffset={{ x: 0, y: -20 }} anchor={{ x: 0.5, y: 1 }}>
        <Text>{marker.name}</Text>
        <Text>{latitude} {longitude}</Text>
      </MarkerAnimated>
      </>}
    </Spring>
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