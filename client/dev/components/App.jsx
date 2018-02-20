import React from 'react';
import Search from './Search.jsx';
<<<<<<< HEAD
import GoogleMaps from './GoogleMaps.jsx'

=======
import axios from 'axios';
>>>>>>> searchFeature

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD

      // default is HR right now
      latitude: 40.750611,
      longitude: -73.978641

    };

=======
      resultList: []
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch({ userAddress, userCommute, userRent }) {
    const userInfo = { userAddress, userCommute, userRent };
    const zip = (userInfo.userAddress.slice(userInfo.userAddress.length - 5, userInfo.userAddress.length));
    console.log('this is zip', {zip: zip });
    axios.post('/zillow', {zip: zip})
      .then((res) => {
        // make sure we are sending back data in an array
        console.log(res.data);
        this.setState({ resultList: res.data })
      })
      .catch((err) => {
        console.log(err)
      })
>>>>>>> searchFeature
  }

  render() {
    return (
      <div>
        <h1>Fletcher Greenfield Project: Job Search?</h1>
<<<<<<< HEAD
        <Search />
        <GoogleMaps isMarkerShown
  					googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  					loadingElement={<div style={{ height: `100%` }} />}
  					containerElement={<div style={{ height: `400px` }} />}
  					mapElement={<div style={{ height: `100%` }}/>}
  					latitude={this.state.latitude}
  					longitude={this.state.longitude}
  			/>
=======
        <Search triggerSearch={this.handleSearch} />
>>>>>>> searchFeature
      </div>
    );
  }
}
