import express from 'express';

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    res.json({ status: 200 });
  });
  return router;
};
