import React from 'react';
import GridRow, { Button } from 'semantic-ui-react';
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
        <div className={style.comRentCont}>
          <div className={style.com}>
            <span style={{ textAlign: 'center', gridColumn: '1', gridRow: '1' }}>Max Commute: {this.props.userCommute}mins</span>
            <input
              type="range"
              min="0"
              max="60"
              value={this.props.userCommute}
              onChange={this.props.handleCommute}
              className={style.slide}
              style={{ margin: 'auto', gridColumn: '1', gridRow: '2' }}
            />
          </div>
          <div className={style.rent}>
            <span style={{ textAlign: 'center', gridColumn: '1', gridRow: '1' }}>Max Rent: ${this.props.userRent}</span>
            <input
              type="range"
              min="0"
              max="6000"
              step="100"
              value={this.props.userRent}
              onChange={this.props.handleRent}
              className={style.slide}
              style={{ margin: 'auto', gridColumn: '1', gridRow: '2' }}
            />
          </div>
        </div>
      </div>
    );
  }
}
