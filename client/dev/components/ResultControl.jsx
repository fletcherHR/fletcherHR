import React from 'react';
import {Button} from 'semantic-ui-react';
import style from '../styles/styles2.css';

export default class ResultControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yoyo: 'yo',
    };

    this.handleFavList = this.handleFavList.bind(this);
    this.handleSearchList = this.handleSearchList.bind(this);
  }

  handleSearchList() {
    this.props.handleSearchList();
  }

  handleFavList() {
    this.props.handleFavList();
  }

  render() {
    return (
      <div>
        <Button.Group
          fluid
          widths="2"
          size="big"
          className={[style.searchFav, style.control].join(' ')}
        >
          <Button onClick={this.handleSearchList}>Search Results</Button>
          <Button onClick={this.handleFavList}>My Favorites</Button>
        </Button.Group>
        <Button.Group
          fluid
          widths="4"
          size="small"
          className={[style.filter, style.control].join(' ')}
        >
          <Button>Rent</Button>
          <Button>Walking</Button>
          <Button>Transit</Button>
          <Button>Driving</Button>
        </Button.Group>
      </div>
    );
  }
}
