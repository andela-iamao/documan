/**
 * @param {Array} fields - contains list of required fields
 * @param {Object} values - contains object to be validated
 *
 * @returns {Boolean} - If all required fields are found
 * @returns {String} - If validation fails
 */
function requiredField(fields, values) {
  let errorMessage = '';
  fields.forEach((field) => {
    if ((!values[field] || values[field] === '') && !errorMessage) {
      errorMessage = `${field} is required`;
    }
  });
  return errorMessage || false;
}

export const signup = (values) => {
  const required = requiredField([
    'firstname',
    'lastname',
    'username',
    'password',
    'email'
  ], values);

  if (required) {
    return required;
  }
};

export const login = (values) => {
  const required = requiredField([
    'email',
    'password'
  ], values);

  if (required) {
    return required;
  }
};
