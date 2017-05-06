import db from '../models/index';

/**
 * getRoles - checks for the role id of the target user
 * @param {Object} req - all properties of the request made to the server
 * @param {Object} res - server response object
 * @param {function} next - callback function that calls the next
 * middleware/controller
 * @return {Object} - status of the processed request and a json object
 * to pass further information of the response
 * @return {void} if no errors occur
 */
export function getRoles(req, res, next) {
  db.Users.findById(req.decoded.id)
    .then((user) => {
      req.userRole = user.roleId;
      if (req.params.id) {
        db.Users.findById(req.params.id)
          .then((targetUser) => {
            req.targetRole = targetUser.roleId;
            next();
          })
          .catch(() => {
            res.status(400).json({ message: 'Sorry an error occured' });
          });
      } else {
        next();
      }
    })
    .catch(() => res.status(400).json({ message: 'Sorry an error occured' }));
}

/**
 * targetIsAdmin - checks if the targeted user is an admin
 * @param {Object} req - all properties of the request made to the server
 * @param {Object} res - server response object
 * @param {function} next - callback function that calls the next
 * middleware/controller
 * @returns {Object} - status of the processed request and a json object
 * to pass further information of the response
 * @returns {void} if no errors occur
 */
export function targetIsAdmin(req, res, next) {
  const id = req.params.id;
  db.Users.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error_code: 'Not found',
          message: 'User not found'
        });
      } else if (user.roleId === 1) {
        req.targetIsAdmin = true;
        next();
      } else {
        next();
      }
    }).catch(() => res.status(400)
      .json({ message: 'Ooops! An error occured' }));
}


/**
 * isAdmin - checks if the requester is an admin
 * @param {Object} req - all properties of the request made to the server
 * @param {Object} res - server response object
 * @param {function} next - callback function that calls the next
 * middleware/controller
 * @returns {Object} - status of the processed request and a json object
 * to pass further information of the response
 * @returns {void} if no errors occur
 */
export function isAdmin(req, res, next) {
  const id = req.decoded.id;
  db.Users.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      } else if (user.roleId === 1) {
        req.isAdmin = true;
        next();
      } else {
        next();
      }
    }).catch(() => res.status(400).json({ message: 'Ooops! An error occured' }));
}
