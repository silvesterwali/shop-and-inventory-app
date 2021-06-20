/**
 * totalPages
 *
 * @param {Number} totalsRows -total of documents
 * @param {Number} limit - limit request every page from client
 * - will provide the total page for font end data table
 * - this just helper for the pagination
 */
exports.totalPages = (totalsRows, limit) => {
  const tPages = Math.ceil(parseInt(totalsRows) / parseInt(limit))

  if (tPages <= 0) {
    return 0
  }
  return isNaN(tPages) ? 1 : tPages
}
