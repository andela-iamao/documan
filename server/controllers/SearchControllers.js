import db from '../models/index';
import { paginate } from '../helpers/helper';
import { searchQuery } from '../config/sequelizeQueries';

 /**
  * @class SearchControllers
  */
class SearchControllers {

  /**
   * searchDoc - search for documents on the platform
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static searchDoc(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 10;
    const hasPermission = {
      isAdmin: req.isAdmin || false,
      userId: req.decoded.id
    };
    if (req.query.q) {
      db.sequelize.query(searchQuery('Documents', 'title', req.query.q, hasPermission))
        .then((result) => {
          if (result[0].length < 1) {
            return res.status(404).json({ message: 'document not found' });
          }
          return res.status(200)
            .json(paginate(limit, offset, result[0], 'documents'));
        });
    } else {
      res.status(400).json({
        error_code: 'Invalid query',
        message: 'Seems you sent a bad query request'
      });
    }
  }

  /**
   * searchUser - search or users on the platform
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static searchUser(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 10;
    if (req.query.q) {
      db.sequelize.query(searchQuery(
        'Users', 'username', req.query.q, true, 'Users'))
        .then((result) => {
          if (result[0].length < 1) {
            return res.status(404).json({ message: 'user not found' });
          }
          return res.status(200)
            .json(paginate(limit, offset, result[0], 'users'));
        });
    } else {
      res.status(400).json({
        error_code: 'Invalid query',
        message: 'Seems you sent a bad query request'
      });
    }
  }
}

export default SearchControllers;
