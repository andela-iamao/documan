import express from 'express';
import db from '../db';

const router = express.Router();
const database = db();

module.exports = () => {
  router.post('/user/create', (req, res) => {
    database.models.user.create(req.body)
    .then((result) => {
      res.json(result);
    }).catch((err) => {
      res.sendStatus(412).json({ status: 'error', msg: err.message });
    });
  });
  return router;
};
