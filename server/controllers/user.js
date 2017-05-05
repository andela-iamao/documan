import db from '../models/index';
import errorRender from '../helpers/error-render';
import { joinUsersRole } from '../config/sequelizeQueries';
import { paginate, encrypt } from '../helpers/helper';

 /**
  * @class UserControllers
  */
class UserControllers {

  /**
   * createUser - creates a new user from the body of the
   * req sent.
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static createUser(req, res) {
    if (req.body.roleId) {
      return res.status(400).json({
        message: 'sorry, you can\'t signup as an admin'
      });
    }
    db.Users.create(req.body)
      .then(result => res.status(200).json(
        { user: result, token: encrypt({ id: result.id }) }))
      .catch((errors) => {
        const error = errorRender(errors);
        return res.status(error.status)
          .json({ error_code: error.error_code, message: error.message });
      });
  }

  /**
   * getAllUserDocuments - get all documents belonging to particulat user
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static getAllUserDocuments(req, res) {
    const id = req.decoded.id;
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    let query;
    if (id === parseInt(req.params.id, 10)
      || (req.isAdmin && !req.targetIsAdmin)) {
      query = { where: { ownerId: req.params.id } };
    } else if ((id !== parseInt(req.params.id, 10))
      && (req.userRole === req.targetRole)) {
      query = `SELECT * FROM "Documents" WHERE "ownerId"=${req.params.id} AND ("accessId"=1 OR "accessId"=3)`;
    } else {
      query = { where: { ownerId: req.params.id, accessId: 1 } };
    }
    if (typeof query === 'object') {
      db.Document.findAll(query)
      .then(results => res.status(200)
        .json(paginate(limit, offset, results, 'documents')));
    } else {
      db.sequelize.query(query)
        .then(results => res.status(200)
          .json(paginate(limit, offset, results[0], 'documents')));
    }
  }

  /**
   * findOneUser - get all one user
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static findOneUser(req, res) {
    const attr = {
      attributes: ['id', 'firstname', 'lastname', 'username', 'email', 'roleId']
    };
    if (req.isAdmin) {
      attr.attributes.push('createdAt', 'updatedAt');
    }
    db.Users.findById(req.params.id, attr)
      .then(user => res.status(200).json(user))
      .catch((errors) => {
        const error = errorRender(errors);
        return res.status(error.status)
          .json({ error_code: error.error_code, message: error.message });
      });
  }

  /**
   * findAllUsers - get all users on the platform
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static findAllUsers(req, res) {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const query = {
      where: {},
      attributes: ['id', 'firstname', 'lastname', 'username', 'email', 'roleId']
    };
    if (req.isAdmin) {
      query.attributes.push('createdAt', 'updatedAt');
    }
    db.Users.findAll(query)
      .then(users => res.status(200)
        .json(paginate(limit, offset, users, 'users')));
  }

  /**
   * updateUser - change or update user's information
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static updateUser(req, res) {
    const id = req.decoded.id;
    let query;
    if (req.isAdmin
      && Object.keys(req.body).length === 1
      && req.body.roleId
      && !req.targetIsAdmin) {
      query = req.body;
    } else if (req.body.roleId && !req.isAdmin) {
      return res.status(401).json({
        message: 'Only and admin user can promote other users'
      });
    } else if (req.params.id && parseInt(req.params.id, 10) === id) {
      query = req.body;
    } else {
      return res.status(401).json({
        message: `Cannot update properties of another ${(req.targetIsAdmin)
          ? 'admin' : 'user'}`
      });
    }
    db.Users.update(query, { where: { id: req.params.id } })
      .then(() => res.sendStatus(204))
      .catch((errors) => {
        const error = errorRender(errors);
        return res.status(error.status)
          .json({ error_code: error.error_code, message: error.message });
      });
  }

  /**
   * deleteUser - delete a user
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static deleteUser(req, res) {
    if (req.targetIsAdmin && req.decoded.id !== req.params.id) {
      return res.status(401).json({ message: 'you cannot delete an admin' });
    } else if (!req.isAdmin && req.decoded.id !== parseInt(req.params.id, 10)) {
      return res.status(401).json({ message: 'you cannot delete another user' });
    }
    db.Users.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(204))
    .catch((errors) => {
      const error = errorRender(errors);
      res.status(error.status)
        .json({ error_code: error.error_code, message: error.message });
    });
  }

  /**
   * getActiveUser - get current information of active user i.e from token
   * sent with the request
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static getActiveUser(req, res) {
    db.sequelize.query(joinUsersRole(req.decoded.id))
      .then(user => res.status(200).json(user[0][0]));
  }

  /**
   * login - returns a token when valid credentials are passed in
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static login(req, res) {
    const unauthorized = { message: 'email/password do not match' };
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
      db.Users.findOne({ where: { email } })
        .then((user) => {
          if (user) {
            if (user.isPassword(user.password, password)) {
              res.status(200).json({ token: encrypt({ id: user.id }) });
            } else {
              res.status(401).json(unauthorized);
            }
          } else {
            res.status(401).json(unauthorized);
          }
        })
        .catch(() => res.status(401).json(unauthorized));
    } else {
      res.status(401).json(unauthorized);
    }
  }

  /**
   * logout - blacklists a token
   * @param {Object} req - all properties of the request made to the server
   * @param {Object} res - server response object
   * @return {Object} - status of the processed request and a json object
   * to pass further information of the response
   */
  static logout(req, res) {
    db.Blacklist.create({ token: req.headers.authorization })
      .then(() => res.sendStatus(204));
  }
}

export default UserControllers;
