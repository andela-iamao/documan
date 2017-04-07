import db from '../models/index';
import helper from '../helpers/error-render';

const Document = db.Document;

const create = (req, res) => {
  Document.create(req.body)
    .then((result) => {
      res.status(200).json(result);
    }).catch((errors) => {
      const error = helper(errors);
      res.status(error.status)
        .json({
          error_code: error.error_code,
          message: error.message
        });
    });
};

export { create };
