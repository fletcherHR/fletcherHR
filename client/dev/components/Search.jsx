import React from 'react';
import { Input, Header, Button, Container, Segment, Divider } from 'semantic-ui-react';

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <Input
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
            placeholder="Search Address"
          />
        </div>
      </div>
    );
  }
}
