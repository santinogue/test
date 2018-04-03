import React from 'react';
import image from '../../assets/shipping.png';
import './ShippingImg.scss';

const ShippingImg = () => (
  <div
    className="free-shipping-img"
    style={{ backgroundImage: `url(${image})` }}
  />
);


export default ShippingImg;
