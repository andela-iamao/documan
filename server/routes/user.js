import express from 'express';
import {
  create,
  findOne,
  findAll,
  updateUser,
  deleteUser,
  login,
  getAllUserDocuments
} from '../controllers/user';
import getRole from '../middlewares/checkRoles';
import { signup } from '../middlewares/validate';
import auth from '../config/auth';
import { isAdmin, targetIsAdmin } from '../helpers/helper';

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
 *   NewLogin:
 *    type: object
 *    required:
 *      - email
 *      - password
 *    properties:
 *      email:
 *        type: string
 *      password:
 *        type: string
 *        format: password
 *   Login:
 *    allOf:
 *      - $ref: '#/definitions/NewLogin'
 *
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
     *      parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
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
     *     parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *     responses:
     *        200:
     *          description: users
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/User'
     */
    .get(auth, isAdmin, findAll)
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
    .post(signup, create);

  router.route('/api/v1/users/:id')
    .all()
  /**
   * @swagger
   * /api/v1/users/1:
   *    get:
   *      description: Returns the user with the id of 1
   *      tags:
   *        - Get user
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   */
    .get(auth, isAdmin, findOne)
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
     *       - name: Authorization
     *         in: header
     *         description: an authorization header
     *         required: true
     *         type: string
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
    .put(auth, isAdmin, targetIsAdmin, updateUser)

    /**
     * @swagger
     * /api/v1/users/1:
     *    delete:
     *      description: Deletes the user with the id of 1
     *      tags:
     *        - Delete user
     *      produces:
     *        - application/json
     *      parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *      responses:
     *        200:
     *          description: users
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/User'
     */
    .delete(auth, isAdmin, targetIsAdmin, deleteUser);

  /**
   * @swagger
   * /api/v1/users/login:
   *   post:
   *     description: Logs in a user
   *     tags:
   *      - Login User
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *       - name: body
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewLogin'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *          type: object,
   *          items:
   *            $ref: '#/definitions/Login'
   */
  router.post('/api/v1/users/login', login);

  /**
   * @swagger
   * /api/v1/users/1/documents:
   *    get:
   *      description: Returns the documents belonging to the user of id 1
   *      tags:
   *        - Get Documents of A User
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: user's documents
   *          schema:
   *            type: array
   */
  router.get(
    '/api/v1/users/:id/documents',
    auth,
    isAdmin,
    targetIsAdmin,
    getRole,
    getAllUserDocuments);
  return router;
};
