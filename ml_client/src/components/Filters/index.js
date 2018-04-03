import React from 'react';
import PropTypes from 'prop-types';
import './Filters.scss';

class Filters extends React.PureComponent {
  renderFilters() {
    const { filters } = this.props;

    if (filters && filters.length > 0) {
      const filtersLength = filters.length;

      return filters.map((value, index) => {
        if (index < filtersLength - 1) {
          return (
            <div className="filter-block">
              <div className="filter-value">{value}</div>
              <div className="filter-separator"> > </div>
            </div>
          );
        }

        return (
          <div className="filter-block">
            <div className="filter-value last">{value}</div>
          </div>
        );
      });
    }

    return null;
  }

  render() {
    return (
      <div className="results-filters">
        {this.renderFilters()}
      </div>
    );
  }
}

Filters.defaultProps = {
  filters: [],
};

Filters.propTypes = {
  filters: PropTypes.array,
};

export default Filters;
