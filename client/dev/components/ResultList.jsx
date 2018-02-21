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
      <ul style={{ display: 'grid', gridAutoRows: '150px' }}>
        {this.props.resultList.map((result, i) => (
          <Result result={result} key={i} />
        ))}
      </ul>
    );
  }
}
