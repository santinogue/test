import React from 'react';
import PropTypes from 'prop-types';
import Filters from '../../components/Filters';
import MLSpinner from '../../components/MLSpinner';
import ShippingImg from '../../components/ShippingImg';
import './ItemDetails.scss';

class ItemDetails extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { item: null, pageIsReady: false };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchItem(id);
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    const { id: prevId } = prevProps.match.params;

    if (id !== prevId) {
      this.fetchItem(id);
    }
  }

  fetchItem(id) {
    this.setState({ pageIsReady: false });
    fetch(`${API_URL}/api/items/${id}`).then((response) => {
      response.json().then((data) => {
        this.setState({ item: data.item, pageIsReady: true });
      });
    });
  }

  render() {
    const { item, pageIsReady } = this.state;

    if (!pageIsReady) {
      return (
        <MLSpinner />
      );
    }

    if (!item) {
      return <h2>No results</h2>;
    }

    const {
      condition,
      categories,
      picture,
      sold_quantity,
      title,
      price,
      description,
      free_shipping: freeShipping,
    } = item;

    const itemCondition = condition === 'new' ? 'Nuevo' : 'Usado';

    // We force the image with to 680px,
    // so we need to calculate the height
    const imageWidth = picture.dimensions[0];
    let imageHeight = picture.dimensions[1];
    imageHeight = Math.round((imageHeight * 680) / imageWidth);

    return (
      <div className="item-details-container">
        <Filters filters={categories} />

        <div className="item-details">
          <div className="item-details-content">
            <div className="details">
              <img
                className="item-image"
                src={picture.url}
                alt=""
                style={{height: `${imageHeight}px`}}
              />

              <div className="item-info">
                <div className="item-info-condition">
                  {`${itemCondition} - ${sold_quantity} vendidos`}
                </div>
                <div className="item-info-title">{title}</div>
                <div className="item-info-price">
                  <div className='price'>
                    {`$ ${price.amount}`}
                    <div>{price.decimals || '00'}</div>
                  </div>

                  {freeShipping && <ShippingImg />}
                </div>
                <button className="buy-button">Comprar</button>
              </div>
            </div>

            <div className="description">
              <div className="description-title">
                Descripción del producto
              </div>

              <div className="description-info">
                {description}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ItemDetails.defaultProps = {
  id: '',
  match: null,
};

ItemDetails.propTypes = {
  id: PropTypes.string,
  match: PropTypes.object,
};

export default ItemDetails;
