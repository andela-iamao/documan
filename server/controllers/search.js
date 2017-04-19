import db from '../models/index';

const searchQuery = (table, field, query, as) => {
  const sequelizeQuery = (as) ?
    `SELECT * FROM "${table}" AS "${as}" WHERE ${field} LIKE '%${query}%'`
    :
    `SELECT * FROM "${table}" WHERE ${field} LIKE '%${query}%'`;
  return sequelizeQuery;
};

const searchDoc = (req, res) => {
  if (req.query.q) {
    db.sequelize.query(searchQuery('Documents', 'title', req.query.q))
      .then((result) => {
        if (result[0].length < 1) {
          return res.status(404).json({
            message: 'document not found'
          });
        }
        res.status(200).json(result[0]);
      });
  } else {
    res.status(400).json({
      error_code: 'Invalid query',
      message: 'Seems you sent a bad request'
    });
  }
};

const searchUser = (req, res) => {
  if (req.query.q) {
    db.sequelize.query(searchQuery('Users', 'username', req.query.q, 'Users'))
      .then((result) => {
        if (result[0].length < 1) {
          return res.status(404).json({
            message: 'user not found'
          });
        }
        res.status(200).json(result[0]);
      });
  } else {
    res.status(400).json({
      error_code: 'Invalid query',
      message: 'Seems you sent a bad request'
    });
  }
};

export { searchDoc, searchUser };
