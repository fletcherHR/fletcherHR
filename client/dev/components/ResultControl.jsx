import React from 'react';
import {Button} from 'semantic-ui-react';
import style from '../styles/styles2.css';

export default class ResultControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yoyo: 'yo',
    };
  }

  render() {
    return (
      <div>
        <Button.Group
          fluid="true"
          size="big"
          className={[style.searchFav, style.control].join(' ')}
        >
          <Button>Search Results</Button>
          <Button>My Favorites</Button>
        </Button.Group>
        <Button.Group
          fluid="true"
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
