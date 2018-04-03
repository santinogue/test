import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import ResultRow from './ResultRow';
import Filters from '../../components/Filters';
import MLSpinner from '../../components/MLSpinner';
import './Results.scss';

class Results extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { items: [], filters: null, pageIsReady: false };
  }

  componentDidMount() {
    const { search } = queryString.parse(this.props.location.search);
    this.fetchItems(search);
  }

  componentDidUpdate(prevProps) {
    const { search } = queryString.parse(this.props.location.search);
    const { search: prevSearch } = queryString.parse(prevProps.location.search);

    if (search !== prevSearch) {
      this.fetchItems(search);
    }
  }

  fetchItems(query) {
    this.setState({ pageIsReady: false });
    fetch(`${API_URL}/api/items?q=${query}`).then((response) => {
      response.json().then((data) => {
        this.setState({
          items: data.items || [],
          filters: data.categories,
          pageIsReady: true,
        });
      });
    });
  }

  render() {
    const { items, filters, pageIsReady } = this.state;

    if (!pageIsReady) {
      return (
        <MLSpinner />
      );
    }

    if (items.length === 0) {
      return (
        <div className="results">
          <h2>No results</h2>
        </div>
      );
    }

    return (
      <div className="results">
        <Filters filters={filters} />

        <div className="results-list">
          {items.map((item, index) => (
            <ResultRow
              key={item.id}
              item={item}
              last={index === 3}
            />
          ))}
        </div>
      </div>
    );
  }
}

Results.defaultProps = {
  location: null,
};

Results.propTypes = {
  location: PropTypes.object,
};

export default Results;
