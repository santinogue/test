import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import LogoImg from '../../assets/logo.png';
import './SearchInput.scss';

class SearchInput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onHomeClick = this.onHomeClick.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  componentDidMount() {
    this.input.addEventListener('keypress', (e) => {
      const key = e.which || e.keyCode;
      // 13 is enter
      if (key === 13) {
        this.onSearchClick();
      }
    });
  }

  onHomeClick() {
    this.props.history.push('/');
  }

  onSearchClick() {
    this.props.history.push(`/items?search=${this.input.value}`);
  }

  render() {
    return (
      <div className="search-input">
        <div className="input-container">
          <img src={LogoImg} onClick={this.onHomeClick} alt="" />
          <input ref={(input) => { this.input = input; }} placeholder="Nunca dejes de buscar" />
          <button onClick={this.onSearchClick} className="search-button" />
        </div>
      </div>
    );
  }
}

SearchInput.defaultProps = {
  history: null,
};

SearchInput.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SearchInput);
