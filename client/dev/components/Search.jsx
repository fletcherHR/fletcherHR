import React from 'react';
import { Input, Button, Header, Icon } from 'semantic-ui-react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAddress: '',
    };
    this.handleAddress = this.handleAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      const searchQuery = {
        target: {
          value: this.state.userAddress,
        },
      };
      this.handleSubmit(searchQuery);
    }
  }

  handleAddress(e) {
    this.setState({ userAddress: e.target.value });
  }

  handleSubmit(e) {
    this.setState({
      userInput: e.target.value,
    }, () => {
      this.props.triggerSearch(this.state);
    });
  }
  render() {
    return (

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 4fr', gridTemplateRows: '4.166vh 4.166vh 4.166vh 4.166vh' }}>
        <Header size="huge" style={{ color: 'white',  paddingTop: '10px', paddingRight: '5px', textAlign: 'center', gridColumn: '5', gridRow: '1', fontSize: '29px' }}>
          <Header.Content>
            Home To Work
          </Header.Content>

        </Header>

        <Icon style={{ gridColumn: '1', gridRow: '2' }} size="huge" name="home" color="white" inverted="yes"/>
        <Icon style={{ gridColumn: '2', gridRow: '2' }} size="huge" name="arrow right" color="white" inverted="yes"/>
        <Icon style={{ gridColumn: '3', gridRow: '2' }} size="huge" name="building" color="white" inverted="yes"/>

        <div style={{ gridColumn: '5', gridRow: '3', marginBottom: '100px' }}>
          <Input
            style={{ marginRight: '15px' }}
            fluid
            action={
              <Button
                color="teal"
                icon="search"
                onClick={this.handleSubmit}
              />
            }
            onKeyPress={this.onKeyPress}
            actionPosition="left"
            type="text"
            value={this.state.userAddress}
            onChange={this.handleAddress}
            placeholder="Where Do You Work"
          />
        </div>
      </div>
    );
  }
}
