import jwt from 'jsonwebtoken';

 /**
  * cutList - cut an array from a given start index to an end index
  * @param {Array} list - array to cutList
  * @param {number} start - index to start from
  * @param {number} end - index to end sliced
  * @return {Array} sliced array
  */
function cutList(list, start, end) {
  let limit = 0;
  const sliced = [];
  list.forEach((item, index) => {
    if (index >= start && limit < end) {
      sliced.push(item);
      limit += 1;
    }
  });
  return sliced;
}

 /**
  * paginate - convert an plain array to a paginated object one given
  * the limit and offset of the array
  * @param {number} limit - number of items to include
  * @param {number} offset - array index to start from
  * @param {Array} response - plain array to paginate
  * @param {String} field - name to give the main object key
  * @return {Object} paginated object
  */
function paginate(limit, offset, response, field) {
  const pageCount = Math.ceil(response.length / limit);
  const paginated = { [field]: {
    paginationMeta: {
      page_count: (pageCount > 1) ? pageCount : 1,
      total_count: response.length,
      page_size: parseInt(limit, 10),
      page: Math.floor(
        (parseInt(limit, 10) + parseInt(offset, 10))
        / parseInt(limit, 10))
    }
  } };
  paginated[field].results = cutList(response, offset, limit);
  return paginated;
}

 /**
  * encrypt - sign a new token based on the payload passed to it
  * @param {Object} payload - contains information to sign
  * token with
  * @return {Object} signed jwt token
  *
  */
function encrypt(payload) {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3),
    data: payload
  }, process.env.JWT_SECRET);
}

 /**
  * hasAccess - checks if the user has access to the document
  * @param {number} userId - id of the user to check for
  * @param {String} docAccess - list of user ids that have access to
  * the document
  * @return {Boolean} - true if the user has access and false otherwise
  */
function hasAccess(userId, docAccess) {
  const authorizedUsers = docAccess.split(';');
  if (authorizedUsers.includes(userId)) {
    return true;
  }
  return false;
}

/**
 * @param {Array} fields - contains list of required fields
 * @param {Object} values - contains object to be validated
 *
 * @returns {Boolean} - If all required fields are found
 * @returns {String} - If validation fails return error message
 */
function requiredField(fields, values) {
  let errorMessage = '';
  fields.forEach((field) => {
    if ((!values[field] || values[field] === '') && !errorMessage) {
      errorMessage = `${field} cannot be empty`;
    }
  });
  return errorMessage || false;
}

/**
 * @param {Integer} status - contains status code
 * @param {Object} error - contsains error object
 * @param {Object} res - contains the response object from node
 *
 * @returns {Object} - returns response to be sen
 */
function errorRender(status, error, res) {
  return res.status(status).json({
    message: error.message
  });
}

export {
  encrypt,
  paginate,
  requiredField,
  hasAccess,
  errorRender };
