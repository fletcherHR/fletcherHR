import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import style from '../styles/styles2.css';

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.setState({
      active: !this.state.active,
    });
    if (this.state.active) {
      // trigger save to saveToFavorites
    } else {
      // trigger delete from favorites
    }
    console.log('this is the state: ', this.state.active);
  }

  render() {
    const imageURL = this.props.result.images;
    const { active } = this.state;
    return (
      <div className={style.result} style={{ backgroundImage: `url(${imageURL})` }}>
        <Button
          className="favorites"
          icon="star"
          onClick={this.handleButtonClick}
          toggle active={active}
          size="large"
          style ={{ gridColumn: '2', gridRow: '1',}}
        />
        <span style={{ gridColumn: '1', gridRow: '2', opacity: '0.8' }}>
          - Price per Month: ${this.props.result.prices}
        </span>
        <span style={{ gridColumn: '1', gridRow: '3', opacity: '0.8' }}>
          - Address: {this.props.result.addresses}
        </span>
        <span style={{ gridColumn: '1/3', gridRow: '4/6', opacity: '0.8' }}>
          - Commute Times:<br/>
          Walking:({this.props.result.walking}) 
          Driving:({this.props.result.driving}) 
          Transit:({this.props.result.transit})
        </span>
      </div>
    );
  }
}
