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
      <div style={{ gridRow: '2/7', gridColumn: '2', display: 'grid', gridAutoRows: '150px', overflowY: 'auto' }}>
          {this.props.resultList.map((result, i) => (
            <Result result={result} key={i} userName={this.props.userName}/>
          ))}
      </div>
    );
  }
}
