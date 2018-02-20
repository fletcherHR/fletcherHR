import React from 'react';
import Result from './Result.jsx';

export default class ResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'placeholder'
    };
  }

  render() {
    return (
      <ul>
        {this.props.resultList.map(result => (
          <Result result={result} key={result.prices} />
        ))}
      </ul>
    );
  }
}
