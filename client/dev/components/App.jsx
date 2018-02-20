import React from 'react';
import Search from './Search.jsx';
import GoogleMaps from './GoogleMaps.jsx'
import Login from './Login.jsx';
import ResultList from './ResultList.jsx';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultList: [{prices: 500, addresses: 'addresses', images: 'imageurl'}],
      // default is HR right now
      latitude: 40.750611,
      longitude: -73.978641,
      userName: '',
      loggedIn: 0,
    };

    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.packData = this.packData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);


    axios.post('/commute', { address: '200+Central+Park+South+NY' })
      .then((res) => {
        // make sure we are sending back data in an array
      })
      .catch((err) => {
        console.log(err);
      })
  }

  packData({ prices, addresses, images }) {
    const temp = [];
    for (let i = 0; i < prices.length; i += 1) {
      const obj = { prices: prices[i], addresses: addresses[i], images: images[i] };
      temp.push(obj);
    }
    this.setState({ resultList: temp }, () => console.log('this is the updated state: ', this.state));
  }

  handleSearch({ userAddress, userCommute, userRent }) {
    const userInfo = { userAddress, userCommute, userRent };
    const zip = (userInfo.userAddress.slice(userInfo.userAddress.length - 5, userInfo.userAddress.length));
    console.log('this is zip', { zip, userAddress });
    axios.post('/zillow', { zip, userAddress })
      .then((res) => {
        // make sure we are sending back data in an array
        this.packData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }


  login(userName, password, cb) {
    axios.post('/login', {
      userName,
      password,
    })
      .then((res) => {
        if (res.data.allow) {
          this.setState({
            loggedIn: 1,
            userName: res.data.userName,
          });
        } else {
          cb('Inncorect Login Information');
        }
      });
  }

  signUp(userName, password, cb) {
    axios.post('/signUp', {
      userName,
      password,
    })
      .then((res) => {
        console.log(res);
        if (res.data.allow) {
          this.setState({
            loggedIn: 1,
            userName: res.data.userName,
          });
        } else {
          cb('User Name Taken');
        }
      });
  }

  render() {
    return (
      <div>
        {
          this.state.loggedIn ?
            <div>
              <h1>Fletcher Greenfield Project: Job Search?</h1>
              <Search triggerSearch={this.handleSearch}/>
              <ResultList resultList={this.state.resultList} />
              <GoogleMaps isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }}/>}
                latitude={this.state.latitude}
                longitude={this.state.longitude}
              />
            </div> :
            <Login signUp={this.signUp} login={this.login} />
        }
      </div>
    );
  }
}
