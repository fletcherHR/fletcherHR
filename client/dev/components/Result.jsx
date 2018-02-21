import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

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
      <div style={{
          border: '1px solid black',
          backgroundImage: `url(${imageURL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'grid',
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
        />
        <span>
          ${this.props.result.prices}
        </span>
        <span>
          - {this.props.result.addresses}
        </span>
        <span>
          - Commute Times:<br/>
          Walking:({this.props.result.walking}) 
          Driving:({this.props.result.driving}) 
          Transit:({this.props.result.transit})
        </span>
      </div>
    );
  }
}
