import React from 'react';
import Search from './Search.jsx'

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h1>Fletcher Greenfield Project: Job Search?</h1>
        <Search/>
      </div>



    )
  }
}
