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
 * user/create:
 *   post:
 *     tags:
 *       - iamdocuman
 *     description: Creates a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: user's first name
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewUser'
 *     responses:
 *       200:
 *         description: User successfully created
 */
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
