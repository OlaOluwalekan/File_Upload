const BadRequestError = require('./bad-request')
const CustomAPIError = require('./custom-api')
const UnauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./not-found')

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
}
