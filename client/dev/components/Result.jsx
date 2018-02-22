import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import axios from 'axios';
import style from '../styles/styles2.css';

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.showMarkerClick = this.showMarkerClick.bind(this);
  }

  handleButtonClick() {
    this.setState({
      active: !this.state.active,
    }, () => {
      if (this.state.active) {
        // trigger save to saveToFavorites
        axios.post('/favs', {
          price: this.props.result.prices,
          address: this.props.result.addresses,
          image: this.props.result.images,
          transit: this.props.result.transit,
          driving: this.props.result.driving,
          hLatLong: this.props.result.hLatLong,
          userName: this.props.userName
        });
      } else {
        // trigger delete from favorites
        axios.post('dfavs', {
          address: this.props.result.addresses,
          userName: this.props.userName
        });
      }
    });
  }

  showMarkerClick() {
    this.props.showMarkerClick(this.props.result);
  }


  render() {
    const imageURL = this.props.result.images;
    const { active } = this.state;
    return (
      <div className={style.result} style={{ backgroundImage: `url(${imageURL})` }}>
        <Button
          className="showMarker"
          icon="location arrow"
          onClick={this.showMarkerClick}
          value={this.props.result}
          style={{ gridColumn: '2', gridRow: '1' }}
        />
        <Button
          className="favorites"
          icon="star"
          onClick={this.handleButtonClick}
          toggle active={active}
          size="large"
          style={{ gridColumn: '3', gridRow: '1' }}
        />
        <span style={{ gridColumn: '1/4', gridRow: '3', opacity: '0.9' }}>
          - Price per Month: ${this.props.result.prices}
        </span>
        <span style={{ gridColumn: '1/4', gridRow: '4', opacity: '0.9' }}>
          - Address: {this.props.result.addresses}
        </span>
        <span style={{ gridColumn: '1/4', gridRow: '5', opacity: '0.9' }}>
          - Commute Times:
          Driving:({this.props.result.driving})
        </span>
      </div>
    );
  }
}
// Transit:({this.props.result.transit})
// Walking:({this.props.result.walking})