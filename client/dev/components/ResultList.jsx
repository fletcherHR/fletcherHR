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
      <div style={{ gridRow: '2', gridColumn: '2', display: 'grid', gridAutoRows: '150px' }}>
          {this.props.resultList.map((result, i) => (
            <Result onClick={this.props.handleListClick()} result={result} key={i} />
          ))}
      </div>
    );
  }
}
