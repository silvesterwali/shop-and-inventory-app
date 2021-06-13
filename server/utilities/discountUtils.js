/**
 * countDiscount
 *
 * - utils for counting the total product after discount
 *
 *
 * @param {Number} price - the price of transaction
 * @param {Number} qty - the quantity of transaction
 * @param {Number} discount -the discount value
 * @return {Number}
 */
exports.countDiscount = (price, qty, discount) => {
  const total = parseFloat(price) * parseFloat(qty)
  const totalDiscount = (parseFloat(discount) / 100) * total
  const totalPrice = total - totalDiscount
  return totalPrice.toFixed(2)
}
