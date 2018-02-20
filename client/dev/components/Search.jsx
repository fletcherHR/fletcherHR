import React from 'react';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ userInput: e.target.value });
  }

  render() {
    return (

      <div>

        <input
          type="text"
          value={this.state.userInput}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          onClick={this.handleChange}
          value={this.state.userInput}
        >Search
        </button>

      </div>
    );
  }
}
