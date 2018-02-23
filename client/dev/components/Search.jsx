import React from 'react';
import { Input, Button } from 'semantic-ui-react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAddress: '',
    };
    this.handleAddress = this.handleAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
