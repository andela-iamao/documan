import express from 'express';
import UserControllers from '../controllers/UserControllers';
import { getRoles, isAdmin, targetIsAdmin } from '../middlewares/checkRoles';
import { signup } from '../middlewares/validate';
import { verifyToken, isBlacklist } from '../middlewares/authenticate';

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
     *        - Users
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
     *  /api/v1/users/?limit={limit}&offset={offset}:
     *   get:
     *     description: Returns {limit} users from the the {offset}
     *     tags:
     *       - Users
     *       - Get users
     *     produces:
     *        - application/json
     *     parameters:
     *        - name: limit
     *          description: number of users to return
     *          in:  path
     *          required: true
     *          type: string
     *        - name: offset
     *          description: index number of user to start from
     *          in:  path
     *          required: true
     *          type: string
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
    .get(verifyToken, isBlacklist, isAdmin, UserControllers.findAllUsers)
    /**
     * @swagger
     * /api/v1/users:
     *   post:
     *     description: Creates a user
     *     tags:
     *      - Users
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
    .post(signup, UserControllers.createUser);


  /** @swagger
    *  /api/v1/users/active:
    *   get:
    *     description: Get the information of the current active user
    *     tags:
    *       - Users
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
  router.get('/api/v1/users/active',
    verifyToken,
    isBlacklist,
    UserControllers.getActiveUser);

  router.route('/api/v1/users/:id')
    .all()
  /**
   * @swagger
   * /api/v1/users/{userId}:
   *    get:
   *      description: Returns a single user based on the id passed in the path
   *      tags:
   *        - Users
   *        - Get users
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: userId
   *          description: id of user to get
   *          in:  path
   *          required: true
   *          type: integer
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
    .get(verifyToken, isBlacklist, isAdmin, UserControllers.findOneUser)

    /**
     * @swagger
     * /api/v1/users/{userId}:
     *   put:
     *     description: Update the information of a user
     *     tags:
     *      - Users
     *      - Update User
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in: header
     *         description: an authorization header
     *         required: true
     *         type: string
     *       - name: userId
     *         description: ID of user to update
     *         in:  path
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
    .put(verifyToken, isBlacklist, isAdmin, targetIsAdmin, UserControllers.updateUser)

    /**
     * @swagger
     * /api/v1/users/{userId}:
     *    delete:
     *      description: Delete a whose ID is passed into the path
     *        - Users
     *        - Delete user
     *      produces:
     *        - application/json
     *      parameters:
     *        - name: userId
     *          description: ID of user to delete
     *          in:  path
     *          required: true
     *          type: string
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
    .delete(
      verifyToken,
      isBlacklist,
      isAdmin,
      targetIsAdmin,
      UserControllers.deleteUser);

  /**
   * @swagger
   * /api/v1/users/login:
   *   post:
   *     description: Logs in a user
   *     tags:
   *      - Users
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
  router.post('/api/v1/users/login', UserControllers.login);

  /**
   * @swagger
   * /api/v1/users/login:
   *   post:
   *     description: >
   *                Hitting this enndpoint will add the active token to the blacklist.
   *                Hence, logging the user out
   *     tags:
   *      - Users
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
  router.post('/api/v1/users/logout', UserControllers.logout);

  /**
   * @swagger
   * /api/v1/users/{param}/documents:
   *    get:
   *      description: Returns the documents belonging to the user of id 1
   *      tags:
   *        - Users
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
  router.get('/api/v1/users/:id/documents',
    verifyToken,
    isBlacklist,
    isAdmin,
    targetIsAdmin,
    getRoles,
    UserControllers.getAllUserDocuments
  );

  return router;
};
