import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const GoogleMaps = withScriptjs(withGoogleMap((props) => (
    <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: props.latitude, lng: props.longitude }}
        center={{ lat: props.latitude, lng: props.longitude }}
      >
        {props.isMarkerShown && <Marker position={{ lat: props.latitude, lng: props.longitude }} />}
    </GoogleMap>

)))

export default GoogleMaps
