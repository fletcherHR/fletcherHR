import React from 'react';
import Search from './Search.jsx';
import GoogleMaps from './GoogleMaps.jsx'
import Login from './Login.jsx';
import ResultList from './ResultList.jsx';
import axios from 'axios';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
import style from '../styles/styles2.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultList: [{ prices: 2000, addresses: 'addresses', images: 'https://photos.zillowstatic.com/p_e/IS66k9fwkyagry0000000000.jpg', walking: '5 minutes', driving: '3 minutes', transit: '4 minutes' },
      { prices: 1500, addresses: 'addresses2', images: 'https://media.boingboing.net/wp-content/uploads/2015/04/chicken3.jpg', walking: '10 minutes', driving: '4 minutes', transit: '6 minutes' },
      { prices: 1700, addresses: 'addresses3', images: 'https://media.boingboing.net/wp-content/uploads/2015/04/chicken3.jpg', walking: '15 minutes', driving: '6 minutes', transit: '8 minutes' }],
      // default is HR right now maybe add more later
      userInfo: { userAddress: 'myaddress', userCommute: '60', userRent: '5' },
      latitude: 40.750611,
      longitude: -73.978641,
      hLatLong: [{ lat: 40.750611, lng: -73.978641 }],
      mapList: [{id: 0, addresses: 'addresses', prices: 2000, hLatLong: { lat: 40.7484, lng: -73.9857 } }],
      userName: '',
      loggedIn: 0,
      loading: false,
    };

    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.packData = this.packData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleListClick = this.handleListClick.bind(this);
  }

  packData( { prices, addresses, images, transit, driving, walking, hLatLong }) {
    const temp = [];
    const mapTemp = [];
    mapTemp.push(this.state.mapList[0]);
    console.log('this is the res.data in packData\n', { prices, addresses, images, transit, driving, walking, hLatLong });
    for (let i = 0; i < hLatLong.length; i += 1) {
      // Can add additional conditions to filter results
      if (prices[i] < this.state.userInfo.userRent) {
        // passing down "id" into resultList to make handling them easier
        const obj = { id: i, prices: prices[i], addresses: addresses[i], images: images[i], driving: driving[i], hLatLong: hLatLong[i] };
        temp.push(obj);
        const mapObj = { id: i + 1, addresses: addresses[i], prices: prices[i], hLatLong: hLatLong[i] };
        mapTemp.push(mapObj);
      }
    }
    this.setState({ resultList: temp, hLatLong, mapList: mapTemp }, () => console.log('this is the updated state: ', this.state));
  }

  handleSearch({ userAddress, userCommute, userRent }) {
    const userInfo = { userAddress, userCommute, userRent };
    const zip = (userInfo.userAddress.slice(userInfo.userAddress.length - 5, userInfo.userAddress.length));
    console.log('this is zip', { zip, userAddress });
    this.setState({
      loading: true,
    });
    axios.post('/zillow', { zip, userAddress, userRent })
      .then((res) => {
        console.log(res.data);
        // make sure we are sending back data in an array
        this.setState(
          {
            userInfo: { userAddress, userCommute, userRent },
            loading: false,
            mapList: [{ addresses: userAddress, prices: 'this is your work', hLatLong: res.data.jLatLong }],
          },
          () => this.packData(res.data)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }



  // clicked list will render as a Marker on the google maps
  handleListClick({ addresses, prices, hLatLong }) {
    // const tempMapList = this.state.mapList;
    // tempMapList.push({ addresses, prices, hLatLong });
    this.setState({
      mapList: [{
        id: 0, addresses, prices, hLatLong
      },
      ],
    }, () => console.log(this.state));
  }



  login(userName, password, cb) {
    if(userName === ''){
      this.setState({
        loggedIn: 1,
        userName: '',
      });
    } else {
      axios.post('/login', {
        userName,
        password,
      })
        .then((res) => {
          if (res.data.allow) {
            console.log(res.data, 'res.data')
            this.setState({
              loggedIn: 1,
              userName: res.data.userName,
            });
          } else {
            cb('Inncorect Login Information');
          }
        });
    }
  }

  signUp(userName, password, cb) {
    axios.post('/signUp', {
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
          console.log('User Name Taken');
          cb('User Name Taken');
        }
      });
  }

  render() {
    return (
      <div>
        {
          this.state.loggedIn ?
            <div className={style.logged}>
              <Search triggerSearch={this.handleSearch} />
              <ResultList resultList={this.state.resultList} userName={this.state.userName}/>
              <div className={style.map}>
                <GoogleMaps
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `83.33vh` }} />}
                  mapElement={<div style={{ height: `100%` }}/>}
                  mapList={this.state.mapList}
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                />
              </div>
              <Loader
                style={{ display: this.state.loading ? 'block' : 'none' }}
                active inline="centered"
                size="large"
              >Loading
              </Loader>

            </div> :
            <Login signUp={this.signUp} login={this.login} />
        }
      </div>
    );
  }
}
