import express from 'express';
import db from '../models/index';

const router = express.Router();

module.exports = () => {
  router.post('/user/create', (req, res) => {
    db.Users.create(req.body)
    .then((result) => {
      res.json(result);
    }).catch((err) => {
      res.json({ status: 'error', msg: err.message });
    });
  });
  return router;
};
