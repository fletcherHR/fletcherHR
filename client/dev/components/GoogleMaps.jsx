import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const GoogleMaps = withScriptjs(withGoogleMap(props => (

  // <GoogleMap
  //   defaultZoom={13}
  //   defaultCenter={{ lat: props.latitude, lng: props.longitude }}
  //   center={{ lat: props.latitude, lng: props.longitude }}
  // >
  //   {props.isMarkerShown && <Marker position={{ lat: props.latitude, lng: props.longitude }} />}
  // </GoogleMap>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: props.mapList[0].hLatLong.lat, lng: props.mapList[0].hLatLong.lng }}
    center={{ lat: props.mapList[0].hLatLong.lat, lng: props.mapList[0].hLatLong.lng }}
  >
    {props.isMarkerShown && props.mapList.map((marker, i) => (
      <Marker position={{ lat: marker.hLatLong.lat, lng: marker.hLatLong.lng }} key={i} />
    ))}
  </GoogleMap>

)));

export default GoogleMaps

//
