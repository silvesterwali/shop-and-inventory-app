class GeneralError extends Error {
  constructor(message = 'Internal Server Error') {
    super()
    this.message = message
  }

  getCode() {
    if (this instanceof BadRequest) return 400
    if (this instanceof NotFound) return 404
    return 500
  }
}
/**
 * BadRequest
 *
 * - Generate http status `400` with default `message`
 */
class BadRequest extends GeneralError {
  message = 'Bad Request'
}
/**
 * NotFound
 *
 * - Generate http status `404`  with default `message`
 */
class NotFound extends GeneralError {
  message = 'Data Not Found'
}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
}
