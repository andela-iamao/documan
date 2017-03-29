import express from 'express';
import db from '../models/index';

const router = express.Router();

module.exports = () => {
  /**
   * @swagger
   * /api/v1/users:
   *   get:
   *     description: Returns users
   *     tags:
   *      - Users
   *     produces:
   *      - application/json
   *     responses:
   *       200:
   *         description: users
   */
  router.get('/api/v1/users', (req, res) => {
    db.Users.findAll({})
      .then((result) => {
        res.json(result);
      })
      .catch(error => res.status(412).json({ msg: error.message }));
  });
  return router;
};
