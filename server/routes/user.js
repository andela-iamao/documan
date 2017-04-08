import express from 'express';
import { create } from '../controllers/user';

const router = express.Router();

module.exports = () => {
  /**
 * @swagger
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - firstname
 *       - lastname
 *       - username
 *       - email
 *       - password
 *     properties:
 *       firstname:
 *         type: string
 *         example: Han
 *       lastname:
 *         type: string
 *         example: Solo
 *       username:
 *         type: string
 *         example: g-pirate
 *       password:
 *         type: string
 *         format: password
 *         example: millenium-falcon
 *       email:
 *         type: string
 *         example: hansolo@documan.api
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */

  /**
   * @swagger
   * /api/v1/users:
   *   post:
   *     description: Returns users
   *     tags:
   *      - Users
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: body
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewUser'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *          type: object,
   *          items:
   *            $ref: '#/definitions/User'
   */
  router.post('/api/v1/users', create);
  return router;
};
