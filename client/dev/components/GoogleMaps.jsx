import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';

const GoogleMaps = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: props.mapList[0].hLatLong.lat, lng: props.mapList[0].hLatLong.lng }}
    center={{ lat: props.mapList[0].hLatLong.lat, lng: props.mapList[0].hLatLong.lng }}
  >
    {props.mapList.map((marker, i) => (
      <MarkerWithLabel
        position={{ lat: marker.hLatLong.lat, lng: marker.hLatLong.lng }}
        labelAnchor={new google.maps.Point(0, 0)}
        labelStyle={{ backgroundColor: 'white', fontSize: '8px', padding: '16px' }}
        labelVisible={marker.vis}
        onClick={() => props.handleMarkerClick(i)}
        key={i}
      >
        <div>Price: {marker.prices} Drive: {marker.driving} </div>
      </MarkerWithLabel>
    ))}
  </GoogleMap>

)));

export default GoogleMaps;
