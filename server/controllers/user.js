import jwt from 'jsonwebtoken';
import db from '../models/index';
import helper from '../helpers/error-render';

const create = (req, res) => {
  db.Users.create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((errors) => {
      const error = helper(errors);
      res.status(error.status)
        .json({
          error_code: error.error_code,
          message: error.message
        });
    });
};

const findOne = (req, res) => {
  db.Users.findById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    }).catch((errors) => {
      const error = helper(errors);
      res.status(error.status)
        .json({
          error_code: error.error_code,
          message: error.message
        });
    });
};

const findAll = (req, res) => {
  const query = { where: {} };
  if (req.query) {
    query.limit = req.query.limit || null;
    query.offset = req.query.offset || 0;
  }
  db.Users.findAll(query)
    .then((users) => {
      res.status(200).json(users);
    });
};

const updateUser = (req, res) => {
  const id = req.decoded.id || req.decoded.data.id;
  if (req.params.id && parseInt(req.params.id, 10) === parseInt(id, 10)) {
    db.Users.update(req.body, { where: {
      id: req.params.id
    } }).then(() => {
      res.sendStatus(204);
    }).catch((errors) => {
      const error = helper(errors);
      res.status(error.status)
        .json({
          error_code: error.error_code,
          message: error.message
        });
    });
  } else {
    res.status(401).json({
      error_code: 'Unauthorized',
      message: 'Cannot update properties of another user'
    });
  }
};

const deleteUser = (req, res) => {
  if (req.params.id) {
    db.Users.destroy({ where: {
      id: req.params.id
    } }).then(() => {
      res.sendStatus(204);
    }).catch((errors) => {
      const error = helper(errors);
      res.status(error.status)
        .json({
          error_code: error.error_code,
          message: error.message
        });
    });
  } else {
    res.status(400).json({
      error_code: 'Undefined user',
      message: 'Cannot delete an undefined user'
    });
  }
};

const login = (req, res) => {
  if (req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;
    db.Users.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          if (user.isPassword(user.password, password)) {
            const payload = { id: user.id };
            res.status(200).json({
              token: jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: payload
              }, process.env.JWT_SECRET)
            });
          } else {
            res.status(401).json({
              error_code: 'Unauthorized Access',
              message: 'email/password do not match'
            });
          }
        } else {
          res.status(401).json({
            error_code: 'Unauthorized Access',
            message: 'email/password do not match'
          });
        }
      })
      .catch(() => res.sendStatus(404));
  } else {
    res.status(401).json({
      error_code: 'Unauthorized Access',
      message: 'email/password do not match'
    });
  }
};

export { create, findOne, findAll, updateUser, deleteUser, login };
