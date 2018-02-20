import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logIn: true,
      userName: '',
      password: '',
      message : '',
    };
    this.userChange = this.userChange.bind(this);
    this.passChange = this.passChange.bind(this);
    this.login = this.login.bind(this);
    this.signChange = this.signChange.bind(this);
  }

  userChange(e) {
    this.setState({ userName: e.target.value });
  }
  passChange(e) {
    this.setState({ password: e.target.value });
  }
  login() {
    if (this.state.logIn) {
      this.props.login(this.state.userName, this.state.password, (mes) => {
        this.setState({
          message: mes,
        });
      });
    } else {
      this.props.signUp(this.state.userName, this.state.password, (mes) => {
        this.setState({
          message: mes,
        });
      });
    }
  }
  signChange() {
    this.setState({ logIn: !this.state.logIn });
  }

  render() {
    return (
      <div>
        <h3>{this.state.logIn ? 'Login' : 'Sign Up'}</h3>
        <span>User Name: </span>
        <input
          type="text"
          value={this.state.userName}
          onChange={this.userChange}
        />
        <br />
        <span>Password: </span>
        <input
          type="text"
          value={this.state.password}
          onChange={this.passChange}
        />
        <br />
        <button onClick={this.login}>{this.state.logIn ? 'Login' : 'Sign Up'}</button>
        <button onClick={this.signChange}>{this.state.logIn ? 'Sign Up Now' : 'Back to Login'}</button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}