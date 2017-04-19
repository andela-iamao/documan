import db from '../models/index';

const isAdmin = (req, res, next) => {
  const id = req.decoded.id || req.decoded;
  db.Users.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error_code: 'Not found',
          message: 'User not found'
        });
      } else if (user.roleId === 1) {
        req.admin = user;
        next();
      } else {
        next();
      }
    }).catch(() => res.status(400).json({
      message: 'Ooops! An error occured'
    }));
};

const hasAccess = (userId, docAccess) => {
  const authorizedUsers = docAccess.split(';');
  if (authorizedUsers.includes(userId)) {
    return true;
  }
  return false;
};

const targetIsAdmin = (req, res, next) => {
  const id = req.params.id;
  db.Users.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error_code: 'Not found',
          message: 'User not found'
        });
      } else if (user.roleId === 1) {
        req.adminTarget = user;
        next();
      } else {
        next();
      }
    }).catch(() => res.status(400).json({
      message: 'Ooops! An error occured'
    }));
};

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
 * @returns {Object} - returns response to be sent
 */
function errorRender(status, error, res) {
  return res.status(status).json({
    message: error.message
  });
}

export { requiredField, isAdmin, hasAccess, targetIsAdmin, errorRender };
