import jwt from 'jsonwebtoken';
import db from '../models/index';

const message = 'Sorry you don\'t have permission to perform this operation';

/**
 * verifyToken - check if the token passed in is valid
 * @param {Object} req - all properties of the request made to the server
 * @param {Object} res - server response object
 * @param {function} next - callback function that calls the next
 * middleware/controller
 * @returns {Object} - status of the processed request and a json object
 * to pass further information of the response
 * @returns {void} if no errors occur
 */
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message });
      } else {
        req.decoded = decoded.data;
        next();
      }
    });
  } else {
    return res.status(401).json({ message });
  }
}

 /**
  * isBlacklist - check if the token in the header is in the Blacklist table
  * @param {Object} req - all properties of the request made to the server
  * @param {Object} res - server response object
  * @param {function} next - callback function that calls the next
  * middleware/controller
  * @returns {Object} - status of the processed request and a json object
  * to pass further information of the response
  * @returns {void} if no errors occur
  */
function isBlacklist(req, res, next) {
  const token = req.headers.authorization;
  db.Blacklist.findOne({ where: { token } })
    .then((result) => {
      if (result) {
        return res.status(401).json({ message });
      }
      next();
    }).catch(() => res.status(401).json({ message }));
}

export { isBlacklist, verifyToken };
