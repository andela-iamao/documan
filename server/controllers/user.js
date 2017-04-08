import db from '../models/index';

const create = (req, res) => {
  db.Users.create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      const errorList = error.message.split(': ');
      const errorResponse = {
        error_code: errorList[0],
        message: errorList[1]
      };
      if (errorList[0] === 'This email is already in use') {
        res.status(409).json({
          error_code: 'Unique key violation',
          message: errorList[0]
        });
      } else if (errorList[0] === 'This username is already in use') {
        res.status(409).json({
          error_code: 'Unique key violation',
          message: errorList[0]
        });
      } else {
        res.status(400).json(errorResponse);
      }
    });
};

const retrieve = (req, res) => {
  res.send('retrieve users');
};

export { create, retrieve };
