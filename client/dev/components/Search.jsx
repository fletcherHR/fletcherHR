import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAddress: '',
      userCommute: 30,
      userRent: 2000
    };
    this.handleAddress = this.handleAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCommute = this.handleCommute.bind(this);
    this.handleRent = this.handleRent.bind(this);
  }

  handleAddress(e) {
    this.setState({ userAddress: e.target.value });
  }
  handleRent(e) {
    this.setState({ userRent: e.target.value });
  }
  handleCommute(e) {
    this.setState({ userCommute: e.target.value });
  }
  handleSubmit(e) {
    this.setState({
      userInput: e.target.value
    }, () => {
      this.props.triggerSearch(this.state)
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
        <div>
          <h4>commute: {this.state.userCommute}</h4>
          <input
            type="range"
            min="0"
            max="60"
            value={this.state.userCommute}
            onChange={this.handleCommute}
          />
        </div>
        <div>
          <h4>rent: {this.state.userRent}</h4>
          <input
            type="range"
            min="0"
            max="4000"
            value={this.state.userRent}
            onChange={this.handleRent}
          />
        </div>
      </div>
    );
  }
}
