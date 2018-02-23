import React from 'react';
import Search from './Search.jsx';
import GoogleMaps from './GoogleMaps.jsx';
import Login from './Login.jsx';
import ResultList from './ResultList.jsx';
import ResultControl from './ResultControl.jsx';
import axios from 'axios';
import { Dimmer, Loader, Image, Segment, Input } from 'semantic-ui-react';
import style from '../styles/styles2.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultList: [{
        prices: 2000,
        addresses: 'addresses',
        images: 'http://www.fordhamroadbid.org/wp-content/uploads/2015/11/New-York.jpg',
        walking: '5 minutes',
        driving: '3 minutes',
        transit: '4 minutes',
        markerVis: false,
        favorite: false,
      },
      {
        prices: 1500,
        addresses: 'addresses2',
        images: 'http://www.fordhamroadbid.org/wp-content/uploads/2015/11/New-York.jpg',
        walking: '10 minutes',
        driving: '4 minutes',
        transit: '6 minutes',
        markerVis: false,
        favorite: false,
      },
      {
        prices: 1500,
        addresses: 'addresses2',
        images: 'http://www.fordhamroadbid.org/wp-content/uploads/2015/11/New-York.jpg',
        walking: '10 minutes',
        driving: '4 minutes',
        transit: '6 minutes',
        markerVis: false,
        favorite: false,
      },
      {
        prices: 1500,
        addresses: 'addresses2',
        images: 'http://www.fordhamroadbid.org/wp-content/uploads/2015/11/New-York.jpg',
        walking: '10 minutes',
        driving: '4 minutes',
        transit: '6 minutes',
        markerVis: false,
        favorite: false,
      },
      {
        prices: 1700,
        addresses: 'addresses3',
        images: 'http://www.fordhamroadbid.org/wp-content/uploads/2015/11/New-York.jpg',
        walking: '15 minutes',
        driving: '6 minutes',
        transit: '8 minutes',
        markerVis: false,
        favorite: false,
      }],
      // adding a list to show user's favorites
      favList: [],
      // setting state to show fav list vs result list
      fMapList: [{ addresses: 'addresses', prices: 2000, driving: 'Your Work', hLatLong: { lat: 40.7484, lng: -73.9857 }, vis: false }],
      showFavs: false,
      // default is HR right now maybe add more later
      latitude: 40.750611,
      longitude: -73.978641,
      hLatLong: [{ lat: 40.750611, lng: -73.978641 }],
      mapList: [{ addresses: 'addresses', prices: 2000, driving: 'Your Work', hLatLong: { lat: 40.7484, lng: -73.9857 }, vis: false }],
      userName: '',
      loggedIn: 0,
      loading: false,
      userCommute: 40,
      userRent: 4000,
    };
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.packData = this.packData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleListClick = this.handleListClick.bind(this);
    this.sortData = this.sortData.bind(this);
    this.handleCommute = this.handleCommute.bind(this);
    this.handleRent = this.handleRent.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleUnFav = this.handleUnFav.bind(this);
    this.handleSearchList = this.handleSearchList.bind(this);
    this.handleFavList = this.handleFavList.bind(this);
    // this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  check() {
    console.log('something someting: ', this.state);
  }

  packData({
    prices, addresses, images, transit, driving, walking, hLatLong,
  }) {
    const temp = [];
    for (let i = 0; i < hLatLong.length; i += 1) {
      const obj = {
        id: i,
        prices: prices[i],
        addresses: addresses[i],
        images: images[i],
        driving: driving[i],
        transit: transit[i],
        hLatLong: hLatLong[i],
        favorite: false,
      };
      temp.push(obj);
    }

    axios.post('/checkfavs', {
      data: temp,
      username: this.state.userName,
    })
      .then((res) => {
        //console.log('this is res.data within /checkfavs, res.data: ', res.data);
        this.setState({
          resultList: [],
        }, () => {
          this.setState({
            resultList: res.data,
          }, () => {
            //console.log('the new state of result list after checking faves: ', this.state.resultList);
          });
        });
      })
      .catch((err) => {
        //console.log('ERROR in POST to /checkfavs, error: ', err);
      });
  }

  handleSearch({ userAddress }) {
    console.log('this is the userAddress: ', userAddress);
    const zip = (userAddress.slice(userAddress.length - 5, userAddress.length));
    if (isNaN(parseFloat(zip))) return alert('Sorry, we can\'t use that address... Please include the zip code at the end!');
    this.setState({ loading: true });
    axios.post('/zillow', { zip, userAddress })
      .then((res) => {
        const mapListObj = { addresses: userAddress, prices: 'this is your work', hLatLong: res.data.jLatLong, vis: false };
        const temppArray = [];
        temppArray.push(mapListObj);
        // make sure we are sending back data in an array
       // console.log(res.data);
        this.setState(
          {
            loading: false,
            mapList: temppArray,
            fMapList: temppArray
          },
          () => {
            this.packData(res.data);
          },
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // clicked list will render as a Marker on the google maps
  handleListClick({ addresses, prices, hLatLong, driving }) {
    const tempObj = {
      addresses,
      prices,
      hLatLong,
      driving,
      vis: false,
      favorite: this.state.showFavs ? this.state.showFavs : false,
    };
    const anotherTempArray = this.state.showFavs ? this.state.fMapList : this.state.mapList;
    const found = { exist: false, index: null };
    for (let i = 0; i < anotherTempArray.length; i += 1) {
      if (anotherTempArray[i].addresses === tempObj.addresses) {
        found.exist = true;
        found.index = i;
      }
    }
    if (found.exist) {
      anotherTempArray.splice(found.index, 1);
    } else {
      anotherTempArray.push(tempObj);
    }
    if (this.state.showFavs === true) {
      console.log('the state is,', this.state.showFavs, 'so setting tempArray in handleFavClick to fMapList\n')
      this.setState({ fMapList: anotherTempArray }, () => this.setState({ showFavs: this.state.showFavs }));
    }
    else if (this.state.showFavs === false) {
      console.log('the state is,', this.state.showFavs, 'so setting tempArray to mapList');
      this.setState({ mapList: anotherTempArray }, () => this.setState({ showFavs: this.state.showFavs }));
    }
  }


  handleMarkerClick(i) {
    console.log('here');
    const tempArray = this.state.showFavs ? this.state.fMapList : this.state.mapList;
    tempArray[i].vis = !tempArray[i].vis;
    if (this.state.showFavs) {
      this.setState(
        { fMapList: tempArray },
        () => this.setState({ showFavs: this.state.showFavs })
      );
    } else {
      this.setState(
        { mapList: tempArray },
        () => this.setState({ showFavs: this.state.showFavs })
      );
    }
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
            this.setState({
              loggedIn: 1,
              userName: res.data.userName,
            });
          } else {
            cb('Inncorect Login Information');
          }
        })
        .catch((err) => {
          console.log(err);
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
      })
      .catch((err) => {
        console.log(err)
      });
  }

  sortData(type) {
    let list = this.state.resultList;
    this.setState({
      resultList: [],
    }, () => {
      if (type === 1) {
        this.setState({
          resultList: list.sort((a, b) => a.prices - b.prices),
        });
      } else if (type === 2) {
        this.setState({
          resultList: list.sort((a, b) => parseInt(a.transit, 10) - parseInt(b.transit, 10)),
        });
      } else if (type === 3) {
        this.setState({
          resultList: list.sort((a, b) => parseInt(a.driving, 10) - parseInt(b.driving, 10)),
        });
      }
    });
  }

  handleRent(e) {
    this.setState({ userRent: e.target.value });
  }
  handleCommute(e) {
    this.setState({ userCommute: e.target.value });
  }

  handleSearchList() {
    //console.log('handleSearch being called', this.state.showFavs);
    let list = this.state.resultList.slice();
    console.log('HEEHHEHEHEHEH', list);
    this.setState({
      showFavs: false,
      resultList: [],
    }, () => {
      console.log('HEEHHEHEHEHEH22222', list);
      this.setState({
        resultList: list,
      });
    });
  }

  handleFavList() {
    const usernameObject = {
      username: this.state.userName,
    };
    // console.log('this is usernameObject', usernameObject);
    // console.log('handleFav being called', this.state.showFavs);
    axios.post('/getFavs', usernameObject)
      .then((res) => {
        // console.log('this is res.data inside axios call', res.data)
        const tempFavList = [];
        for (let q = 0; q < res.data.length; q += 1) {
          const tempFavObj = {
            prices: res.data[q].price,
            addresses: res.data[q].address,
            images: res.data[q].image,
            transit: res.data[q].transit,
            driving: res.data[q].driving,
            hLatLong:{ lat: parseFloat(res.data[q].lat), lng: parseFloat(res.data[q].lng) },
            vis: false,
            favorite: true
          }
          tempFavList.push(tempFavObj)
        }
        let list = this.state.resultList.slice();
        this.setState(
          {
            resultList: [],
            favList: tempFavList,
          },
          () => this.setState({ showFavs: true, resultList: list },
        ));
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleUnFav(i, should) {
    const list = this.state.resultList;
    list[i].favorite = should;
    this.setState({
      resultList: list,
    });
  }

  render() {
    return (
      <div>
        {
          this.state.loggedIn ?
            <div className={style.logged}>
              <Search triggerSearch={this.handleSearch} />

              <ResultControl
                sortData={this.sortData}
                loading={this.state.loading}
                handleSearchList={this.handleSearchList}
                handleFavList={this.handleFavList}
                handleCommute={this.handleCommute}
                handleRent={this.handleRent}
                userCommute={this.state.userCommute}
                userRent={this.state.userRent}
              />
              <ResultList
                handleUnFav={this.handleUnFav}
                handleFavorites={this.resetFavoriteState}
                maxCom={this.state.userCommute}
                maxRent={this.state.userRent}
                resultList={this.state.showFavs ? this.state.favList : this.state.resultList}
                userName={this.state.userName}
                handleListClick={this.handleListClick}
              />

              <div className={style.map}>
                <GoogleMaps
                  isMarkerShown
                  resultList={this.state.resultList}
                  handleMarkerClick={this.handleMarkerClick}
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCxYMb0yg6OBzoXznjrSp2J7RQwFBViPtY&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: '100%' }} />}
                  containerElement={<div style={{ height: '83.33vh' }} />}
                  mapElement={<div style={{ height: '100%' }} />}
                  mapList={this.state.showFavs ? this.state.fMapList : this.state.mapList}
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                  key="AIzaSyCxYMb0yg6OBzoXznjrSp2J7RQwFBViPtY"
                />
              </div>
            </div> :
            <Login signUp={this.signUp} login={this.login} />
        }
      </div>
    );
  }
}
