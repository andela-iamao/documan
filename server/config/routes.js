import express from 'express';

const route = express.Router();

module.exports = (app) => {
  route.get('/', (req, res) => {
    res.json({ status: 200 });
  });

  app.use(route);
};
