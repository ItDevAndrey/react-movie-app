function formatPrice(priceString) {
  let priceNumber = parseInt(priceString, 10);

  let formattedPrice = (priceNumber / 100).toFixed(2);

  return `$${formattedPrice}`;
}

export default formatPrice;