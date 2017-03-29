import express from 'express';
import db from '../models/index';

const router = express.Router();

module.exports = () => {
  /**
   * @swagger
   * definitions:
   *   User:
   *     type: object
   *     required:
   *       - username
   *       - firstname
   *       - lastname
   *       - email
   *       - password
   *     properties:
   *       username:
   *         type: string
   *         example: fullmetal
   *       firstname:
   *         type: string
   *         example: Edward
   *       lastname:
   *         type: string
   *         example: Elric
   *       email:
   *         type: string
   *         example: Elric
   *       password:
   *         type: string
   *         format: password
   *         example: greater-than-8
   */

  /**
   * @swagger
   * api/v1/users:
   *   get:
   *     tags:
   *       - iamdocuman
   *     description: Fetches all users
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: users successfully fetched
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
