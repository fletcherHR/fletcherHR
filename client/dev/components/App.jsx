import React from 'react';
import Search from './Search.jsx';
import GoogleMaps from './GoogleMaps.jsx';
import Login from './Login.jsx';
import ResultList from './ResultList.jsx';
import ResultControl from './ResultControl.jsx';
import axios from 'axios';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
import style from '../styles/styles2.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultList: [{ prices: 2000, addresses: 'addresses', images: 'https://media.boingboing.net/wp-content/uploads/2015/04/chicken3.jpg', walking: '5 minutes', driving: '3 minutes', transit: '4 minutes', markerVis: false },
        { prices: 1500, addresses: 'addresses2', images: 'https://media.boingboing.net/wp-content/uploads/2015/04/chicken3.jpg', walking: '10 minutes', driving: '4 minutes', transit: '6 minutes', markerVis: false },
        { prices: 1700, addresses: 'addresses3', images: 'https://media.boingboing.net/wp-content/uploads/2015/04/chicken3.jpg', walking: '15 minutes', driving: '6 minutes', transit: '8 minutes', markerVis: false }],
      // default is HR right now maybe add more later
      latitude: 40.750611,
      longitude: -73.978641,
      hLatLong: [{ lat: 40.750611, lng: -73.978641 }],
      mapList: [{ addresses: 'addresses', prices: 2000, hLatLong: { lat: 40.7484, lng: -73.9857 } }],
      userName: '',
      loggedIn: 0,
      loading: false,
      userCommute: 0,
      userRent: 0,
    };

    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.packData = this.packData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleListClick = this.handleListClick.bind(this);
    this.sortData = this.sortData.bind(this);
    this.handleCommute = this.handleCommute.bind(this);
    this.handleRent = this.handleRent.bind(this);
    // this.toggleVisibility = this.toggleVisibility.bind(this);
    // this.resetFavoriteState = this.resetFavoriteState.bind(this);
  }

  resetFavoriteState() {
    console.log('something someting: ', this.state);
  }

  packData( { prices, addresses, images, transit, driving, walking, hLatLong }) {
    const temp = [];
    for (let i = 0; i < hLatLong.length; i += 1) {
      // Can add additional conditions to filter results
      //if (prices[i] < 20000) {
      // passing down "id" into resultList to make handling them easier
      const obj = { id: i, prices: prices[i], addresses: addresses[i], images: images[i], driving: driving[i], hLatLong: hLatLong[i] };
      temp.push(obj);
      // const mapObj = { id: i + 1, addresses: addresses[i], prices: prices[i], hLatLong: hLatLong[i] };
      // mapTemp.push(mapObj);
      //}
    }
    this.setState({ resultList: temp, hLatLong }, );
  }

  handleSearch({ userAddress }) {
    const zip = (userAddress.slice(userAddress.length - 5, userAddress.length));
    this.setState({ loading: true });
    axios.post('/zillow', { zip, userAddress })
      .then((res) => {
        const mapListObj = { addresses: userAddress, prices: 'this is your work', hLatLong: res.data.jLatLong };
        const temppArray = [];
        temppArray.push(mapListObj);
        // make sure we are sending back data in an array
        this.setState(
          {
            loading: false,
            mapList: temppArray,
          },
          () => {
            this.packData(res.data);
            this.resetFavoriteState();
          },
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // clicked list will render as a Marker on the google maps
  handleListClick({ addresses, prices, hLatLong }) {
    const tempObj = { addresses, prices, hLatLong };
    const anotherTempArray = this.state.mapList;
    const found = { exist: false, index: null };
    for (let i = 0; i < this.state.mapList.length; i += 1) {
      if (this.state.mapList[i].addresses === tempObj.addresses) {
        found.exist = true;
        found.index = i;
      }
    }
    if (found.exist) {
      anotherTempArray.splice(found.index, 1);
    } else {
      anotherTempArray.push(tempObj);
    }

    this.setState({ mapList: anotherTempArray });
  }

  login(userName, password, cb) {
    if (userName === '') {
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

  sortData(type) {
    if (type === 1) {
      this.setState({
        resultList: this.state.resultList.sort((a, b) => a.prices - b.prices ),
      });
    } else if (type === 2) {
      this.setState({
        resultList: this.state.resultList.sort((a, b) => parseInt(a.transit, 10) - parseInt(b.transit, 10)),
      });
    } else if (type === 3) {
      this.setState({
        resultList: this.state.resultList.sort((a, b) => parseInt(a.driving, 10) - parseInt(b.driving, 10)),
      });
    }
  }

  handleRent(e) {
    this.setState({ userRent: e.target.value });
  }
  handleCommute(e) {
    this.setState({ userCommute: e.target.value });
  }

  render() {
    return (
      <div>
        {
          this.state.loggedIn ?
            <div className={style.logged}>
              <Search triggerSearch={this.handleSearch} />
<<<<<<< HEAD
              <div>
                <div className={style.comRent}>
                  <h4>commute: {this.state.userCommute}</h4>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={this.state.userCommute}
                    onChange={this.handleCommute}
                  />
                </div>
                <div className={style.comRent}>
                  <h4>rent: {this.state.userRent}</h4>
                  <input
                    type="range"
                    min="0"
                    max="4000"
                    step="100"
                    value={this.state.userRent}
                    onChange={this.handleRent}
                  />
                </div>
              </div>
              <ResultControl sortData={this.sortData} loading={this.state.loading} />
              <ResultList maxCom={this.state.userCommute} maxRent={this.state.userRent} resultList={this.state.resultList} userName={this.state.userName} handleListClick={this.handleListClick}/>
=======
              <ResultControl />
              <ResultList
                handleFavorites={this.resetFavoriteState}
                resultList={this.state.resultList}
                userName={this.state.userName}
                handleListClick={this.handleListClick}
              />
>>>>>>> favoritesbuttonfix
              <div className={style.map}>
                <GoogleMaps
                  isMarkerShown
                  resultList={this.state.resultList}
                  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `83.33vh` }} />}
                  mapElement={<div style={{ height: `100%` }}/>}
                  mapList={this.state.mapList}
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                />
              </div>
<<<<<<< HEAD
=======
              <Loader
                style={{ display: this.state.loading ? 'block' : 'none' }}
                active
                inline="centered"
                size="large"
              >Loading
              </Loader>
>>>>>>> favoritesbuttonfix
            </div> :
            <Login signUp={this.signUp} login={this.login} />
        }
      </div>
    );
  }
}
