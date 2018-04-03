const ITEMS_IN_RESPONSE = 4;

function formatPrice (priceAmount, currency) {
  const price = priceAmount.toString().split('.');

  return {
    currency: currency,
    amount: parseInt(price[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    decimals: price[1] ? parseInt(price[1]) : null,
  };
}

function getCategories(filters) {
  if (filters && filters.length > 0) {
    const categoryFilter = filters[0].id === 'category';

    if (!categoryFilter) {
      return [];
    }

    return filters[0].values[0].path_from_root
      .map(value => value.name);
  }

  return [];
}

function getItems(items) {
  return items.slice(0, ITEMS_IN_RESPONSE).map(item => {
    const price = item.price.toString().split('.');

    return {
      id: item.id,
      title: item.title,
      price: this.formatPrice(item.price, item.currency_id),
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      address: item.address.state_name,
    }
  });
}

function getItemDetails(itemData, description, filters) {
  const picture = itemData.pictures[0];
  const price = itemData.price.toString().split('.');

  return {
    id: itemData.id,
    title: itemData.title,
    price: this.formatPrice(itemData.price, itemData.currency_id),
    picture: {
      url: picture.secure_url,
      dimensions: picture.size.split('x').map(el => parseInt(el)),
    },
    condition: itemData.condition,
    free_shipping: itemData.shipping.free_shipping,
    sold_quantity: itemData.sold_quantity,
    description: description.plain_text,
    categories: this.getCategories(filters),
  }
}

module.exports = {
  getCategories: getCategories,
  getItems: getItems,
  getItemDetails: getItemDetails,
  formatPrice: formatPrice,
}
