import React from 'react';
import { Input, Header, Icon, Button, Container, Segment, Divider, Label } from 'semantic-ui-react';
import style from '../styles/styles2.css';

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
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.login();
    }
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
          block="yes"
          as="h1"
          color="white"
          textAlign="center"
        >Fletcher Group Project Name - Landing Page
        </Header>
        <Container>
          <Input
            fluid
            size="large"
            type="text"
            value={this.state.userName}
            onChange={this.userChange}
            onKeyPress={this.onKeyPress}
            label={
              <Label
                fluid
                icon="user"
                content="Username"
                color="teal"
              />
            }
          />
        </Container>
        <br />
        <Container>
          <Input
            fluid
            size="large"
            type="password"
            value={this.state.password}
            onChange={this.passChange}
            onKeyPress={this.onKeyPress}
            label={
              <Label
                fluid
                icon="key"
                content="Password"
                color="teal"
              />
            }
          />
        </Container>
        <br />
        <Container>
          <Segment>
            <Button
              disabled={this.state.loginButtonState}
              onClick={this.login}
              fluid
              action={{
                color: 'teal'
              }}
              color="teal"
              >{this.state.logIn ? 'Login' : 'Sign Up'}
            </Button>
            <Divider horizontal>Or</Divider>
            <Button
              disabled={false}
              secondary
              fluid
              onClick={this.signChange}
              >{this.state.logIn ? 'Sign Up Now' : 'Back To Login'}
            </Button>
          </Segment>
        </Container>
      </div>
    );
  }
}
