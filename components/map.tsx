

import React from 'react'
import { Platform, Button, Text, Alert, View, StyleSheet, Animated } from 'react-native'
import MapView, { Marker, Circle, UrlTile } from 'react-native-maps'

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
      <MapView ref={element => this.map_view = element}
        style={styles.map} showsUserLocation showsMyLocationButton showsTraffic={false} mapType='mutedStandard'
        onMapReady={()=> { this.map_view.fitToSuppliedMarkers(this.props.find ? [this.props.find] : this.props.markers.map(marker => marker._id.toHexString()), { animated: false }) }}>

        {Platform.OS === 'android' && <UrlTile urlTemplate='https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png' />}

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
  radius: Animated.Value
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export class GPSMarker extends React.Component<GPSMarkerProps, GPSMarkerState> {

  constructor(props: GPSMarkerProps) {
    super(props)
    this.state = {
      radius: new Animated.Value(0)
    }
  }

  componentDidUpdate() {
    Animated.timing(this.state.radius, {
      toValue: 133,
      duration: 666
    }).start(_ => {
      this.state.radius.setValue(0)
    })
  }

  public render() {
    const { marker } = this.props
    const { radius } = this.state

    return <>
      <AnimatedCircle center={marker.coordinates} radius={radius} strokeColor={'rgba(0, 0, 0, 0.2)'} />
      <Circle center={marker.coordinates} radius={4} fillColor={'rgba(0, 0, 0, 0.2)'} />
      <Circle center={marker.coordinates} radius={1} fillColor={'black'} />
      <Marker identifier={marker._id.toHexString()} coordinate={marker.coordinates} centerOffset={{ x: 0, y: -20 }}>
        <Text>{marker.name}</Text>
      </Marker>
    </>
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