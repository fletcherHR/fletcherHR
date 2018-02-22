import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import axios from 'axios';

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
    }, () => {
      if (this.state.active) {
        // trigger save to saveToFavorites
        axios.post('/favs', {
          address: this.props.result.addresses,
          price: this.props.result.prices,
          commuteTime: this.props.result.driving,
          aptImageURL: this.props.result.images,
          userName: this.props.userName
        });
      } else {
        // trigger delete from favorites
      }
    });
  }

  render() {
    const imageURL = this.props.result.images;
    const { active } = this.state;
    return (
      <div style={{
          border: '1px solid black',
          borderRadius: '2%',
          backgroundImage: `url(${imageURL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'grid',
          gridTemplateColumns: '4fr 1fr',
          gridAutoRows: '30px',
          color: 'white',
          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        }}
      >
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
