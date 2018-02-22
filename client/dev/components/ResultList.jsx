import React from 'react';
import Result from './Result.jsx';
import style from '../styles/styles2.css';

export default class ResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'placeholder'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(result) {
    this.props.handleListClick(result);
  }

  render() {
    return (
      <div className={style.resultList}>
        {this.props.resultList.map((result, i) => (
          <Result result={result} key={i} userName={this.props.userName} showMarkerClick={this.handleClick} />
          ))}
      </div>
    );
  }
}
