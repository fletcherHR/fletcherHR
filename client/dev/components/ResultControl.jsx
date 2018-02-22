import React from 'react';
import {Button} from 'semantic-ui-react';
import style from '../styles/styles2.css';

export default class ResultControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeResult: 1,
      activeSort: 0,
    };

    this.changeSort1 = this.changeSort1.bind(this);
    this.changeSort2 = this.changeSort2.bind(this);
    this.changeSort3 = this.changeSort3.bind(this);
    this.handleSearchList = this.handleSearchList.bind(this);
    this.handleFavList = this.handleFavList.bind(this);
  }

  changeSort1() {
    this.setState({
      activeSort: 1,
    });
    this.props.sortData(1);
  }
  changeSort2() {
    this.setState({
      activeSort: 2,
    });
    this.props.sortData(2);
  }
  changeSort3() {
    this.setState({
      activeSort: 3,
    });
    this.props.sortData(3);

  }

  handleSearchList() {
    this.setState({
      activeResult: this.state.activeResult === 1,
    });
    this.props.handleSearchList();
  }

  handleFavList() {
    this.setState({
      activeResult: this.state.activeResult === 2,
    });
    this.props.handleFavList();
  }

  render() {
    return (
      <div className={style.resultControl}>
        <Button.Group
          fluid
          widths="2"
          size="big"
          className={[style.searchFav, style.control].join(' ')}
        >
          <Button
            active={this.state.activeResult === 1}
            onClick={this.handleSearchList}
            loading={this.props.loading}
          >
            Search Results
          </Button>
          <Button
            active={this.state.activeResult === 2}
            onClick={this.handleFavList}
          >
            My Favorites
          </Button>
        </Button.Group>
        <Button.Group
          fluid
          widths="4"
          size="small"
          className={[style.filter, style.control].join(' ')}
        >
          <Button
            active={this.state.activeSort === 1}
            onClick={this.changeSort1}
          >
            Rent
          </Button>
          <Button
            active={this.state.activeSort === 2}
            onClick={this.changeSort2}
          >
            Transit
          </Button>
          <Button
            active={this.state.activeSort === 3}
            onClick={this.changeSort3}
          >
            Driving
          </Button>
        </Button.Group>
      </div>
    );
  }
}
