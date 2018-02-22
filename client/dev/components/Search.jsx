import React from 'react';

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
        <div>
          <input
            type="text"
            value={this.state.userAddress}
            onChange={this.handleAddress}
            placeholder="your address"
          />
          <button
            type="submit"
            onClick={this.handleSubmit}
            value={this.state.userAddress}
          >Search
          </button>
        </div>
      </div>
    );
  }
}
