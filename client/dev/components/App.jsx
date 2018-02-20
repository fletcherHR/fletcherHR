import React from 'react';
import Search from './Search.jsx';
import GoogleMaps from './GoogleMaps.jsx'

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      latitude:'-34.397',
      longitude: '150.644'
    }
  }

  render() {
    return (
      <div>
        <h1>Fletcher Greenfield Project: Job Search?</h1>
        <Search />
        <GoogleMaps isMarkerShown
  					googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  					loadingElement={<div style={{ height: `100%` }} />}
  					containerElement={<div style={{ height: `400px` }} />}
  					mapElement={<div style={{ height: `100%` }}/>}
  					latitude={this.state.latitude}
  					longitude={this.state.longitude}
  			/>
      </div>
    )
  }
}
