import React from 'react';
import Search from './Search.jsx';
import Login from './Login.jsx';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      loggedIn: 0,
    };
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
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
          this.state.loggedIn ? <Search /> : <Login signUp={this.signUp} login={this.login} />
        }
      </div>
    );
  }
}
