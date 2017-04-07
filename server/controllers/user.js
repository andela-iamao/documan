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

const update = (req, res) => {
  if (req.params.id) {
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
    res.status(400).json({
      error_code: 'Undefined user',
      message: 'Cannot update properties of an undefined user'
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

export { create, findOne, findAll, update, deleteUser };
