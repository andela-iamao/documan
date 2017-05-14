
 /**
  * integerQuery - check if the query passed in is an integer
  * @param {Object} req - all properties of the request made to the server
  * @param {Object} res - server response object
  * @param {function} next - callback function that calls the next
  * middleware/controller
  * @returns {Object} - status of the processed request and a json object
  * to pass further information of the response
  * @returns {void} if no errors occur
  */
export default function integerQuery(req, res, next) {
  if (Object.keys(req.query).length > 0) {
    const isInt = Object.keys(req.query).map((query) => {
      if (isNaN(parseInt(req.query[query], 10))) {
        return true;
      }
      return false;
    });
    if (isInt.indexOf(true) !== -1) {
      return res.status(400).json({
        message: 'Invalid input for query'
      });
    }
  }
  next();
}
