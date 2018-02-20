import React from 'react';
import Search from './Search.jsx';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  render() {
    return (
      <div>
        <h1>Fletcher Greenfield Project: Job Search?</h1>
        <Search triggerSearch={this.handleSearch} />
      </div>
    );
  }
}
