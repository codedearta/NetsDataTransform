exports = function(purchaseDate) {
  return purchaseDate.getFullYear() * 10000 + (purchaseDate.getMonth() + 1) * 100 + purchaseDate.getDate();
  // const purchaseDateParts = purchaseDate.split(" ")[0].split("-");
  // const ldayInteger = parseInt(purchaseDateParts[2]+""+purchaseDateParts[1]+""+purchaseDateParts[0],10);
  // return ldayInteger;
};