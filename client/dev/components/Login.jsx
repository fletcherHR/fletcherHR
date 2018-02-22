import React from 'react';
import { Input, Header, Button, Container } from 'semantic-ui-react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logIn: true,
      userName: '',
      password: '',
      message: '',
      loginButtonState: true,
    };
    this.userChange = this.userChange.bind(this);
    this.passChange = this.passChange.bind(this);
    this.login = this.login.bind(this);
    this.signChange = this.signChange.bind(this);
    this.checkUserAndPasswordFields = this.checkUserAndPasswordFields.bind(this);
  }

  userChange(e) {
    this.setState({
      userName: e.target.value,
    }, this.checkUserAndPasswordFields);
  }

  passChange(e) {
    this.setState({
      password: e.target.value,
    }, this.checkUserAndPasswordFields);
  }

  checkUserAndPasswordFields() {
    if (this.state.password.length && this.state.userName.length) {
      this.setState({
        loginButtonState: false,
      });
    } else {
      this.setState({
        loginButtonState: true,
      });
    }
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
        <Header
          as="h1"
          color="teal"
          textAlign="center"
          >Fletcher Group Project Name - Landing Page
        </Header>
        <Container>
          <Input
            fluid
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'user',
              content: 'Username',
               }}
            actionPosition="left"
            type="text"
            value={this.state.userName}
            onChange={this.userChange}
          />
        </Container>
        <br />
        <Container>
          <Input
            fluid
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'key',
              content: 'Password',
            }}
            actionPosition="left"
            type="password"
            value={this.state.password}
            onChange={this.passChange}
          />
        </Container>
        <br />
        <Container>
          <Button
            disabled={false}
            onClick={this.login}
          >Login
          </Button>
          <Button
            disabled={false}
            onClick={this.signChange}
          >Sign Up As New User
          </Button>
          <p>{this.state.message}</p>
        </Container>
      </div>
    );
  }
}

// render() {
//   return (
//     <div>
//       <Header as="h3">Fletcher Group Project Name - Landing Page</Header>
//       <Input
//         icon="user"
//         type="text"
//         label="Username"
//         value={this.state.userName}
//         onChange={this.userChange}
//       />
//       <br />
//       <Input
//         icon="key"
//         type="password"
//         label="Password"
//         value={this.state.password}
//         onChange={this.passChange}
//       />
//       <br />
//       <Button
//         disabled={this.state.loginButtonState}
//         onClick={this.login}
//       >Login
//       </Button>
//       <div><button onClick={this.login}>{this.state.logIn ? 'Login' : 'Sign Up'}</button></div>
//       <div><button onClick={this.signChange}>{this.state.logIn ? 'Sign Up Now' : 'Back to Login'}</button></div>
//       <p>{this.state.message}</p>
//     </div>
//   );
// }
