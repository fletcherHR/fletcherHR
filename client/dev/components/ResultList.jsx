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
    console.log(this.props.resultList.length);
    console.log(this.props.resultList);
    return (
      <div className={style.resultList}>
        {this.props.resultList.map((result, i) => (
          result.prices <= this.props.maxRent && parseInt(result.driving, 10) <= this.props.maxCom ? <Result result={result} key={i} userName={this.props.userName} showMarkerClick={this.handleClick} /> : <br />
          ))}
      </div>
    );
  }
}
