module.exports = function (data, productHTML) {
  // ID
  let output = productHTML.replace(/{%ID%}/g, data.id);
  // replace image first
  output = output.replace(/{%IMAGE%}/g, data.image);
  // then product name
  output = output.replace(/{%PRODUCTNAME%}/g, data.productName);
  // country
  output = output.replace(/{%FROM%}/g, data.from);
  // price
  output = output.replace(/{%PRICE%}/g, data.price);
  // quantity
  output = output.replace(/{%QUANTITY%}/g, data.quantity);
  // nutrients
  output = output.replace(/{%NUTRIENTS%}/g, data.nutrients);
  // organic
  if (!data.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};
