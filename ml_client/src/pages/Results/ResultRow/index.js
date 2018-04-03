import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import ShippingImg from '../../../components/ShippingImg';
import './ResultRow.scss';

class ResultRow extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick() {
    const { item: { id } } = this.props;
    this.props.history.push(`/items/${id}`);
  }

  render() {
    const {
      item: {
        picture,
        price,
        title,
        address,
        free_shipping: freeShipping
      },
      last,
    } = this.props;

    return (
      <div className="result-row" onClick={this.onItemClick}>
        <div className="result-row-data">
          <div className="data-col-left">
            <div
              className="item-img"
              style={{ backgroundImage: `url(${picture})` }}
            />

            <div className="item-data">
              <div className="item-data-row-1">
                $ {price.amount}
                <div className='price-decimals'>{price.decimals || '00'}</div>
                {freeShipping && <ShippingImg />}
              </div>

              <div className="item-data-row-2">
                {title}
              </div>
            </div>
          </div>

          <div className="data-col-right">
            {address}
          </div>
        </div>

        {!last && <div className="row-divisor" />}
      </div>
    );
  }
}

ResultRow.defaultProps = {
  item: null,
  history: null,
  last: PropTypes.bool,
};

ResultRow.propTypes = {
  item: PropTypes.object,
  history: PropTypes.object,
  last: PropTypes.bool,
};

export default withRouter(ResultRow);
