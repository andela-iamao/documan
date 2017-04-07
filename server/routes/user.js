import express from 'express';
import { create, findOne, findAll, update, deleteUser } from '../controllers/user';

const router = express.Router();

export default () => {
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

  router.route('/api/v1/users')
    /**
     * @swagger
     * /api/v1/users:
     *    get:
     *      description: Returns all users
     *      tags:
     *        - Get users
     *      produces:
     *        - application/json
     *      responses:
     *        200:
     *          description: users
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/User'
     */
   /** @swagger
     *  /api/v1/users/?limit=4&offset=2:
     *   get:
     *     description: Returns {limit} users from the the {offset}
     *     tags:
     *       - Get users
     *     produces:
     *        - application/json
     *     responses:
     *        200:
     *          description: users
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/User'
     */
    .get(findAll)
    /**
     * @swagger
     * /api/v1/users:
     *   post:
     *     description: Creates a user
     *     tags:
     *      - Create User
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
    .post(create);

  router.route('/api/v1/users/:id')

  /**
   * @swagger
   * /api/v1/users/1:
   *    get:
   *      description: Returns the user with the id of 1
   *      tags:
   *        - Get user
   *      produces:
   *        - application/json
   *      responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   */
    .get(findOne)
    /**
     * @swagger
     * /api/v1/users/1:
     *   put:
     *     description: Creates a user
     *     tags:
     *      - Update User
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
    .put(update)
    /**
     * @swagger
     * /api/v1/users/1:
     *    delete:
     *      description: Deletes the user with the id of 1
     *      tags:
     *        - Delete user
     *      produces:
     *        - application/json
     *      responses:
     *        200:
     *          description: users
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/User'
     */
    .delete(deleteUser);
  return router;
};
