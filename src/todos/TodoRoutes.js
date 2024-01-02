const express = require('express');
const router = express.Router();

const todoController = require('./TodoController');

router.use(todoController.authenticateJWT);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get todos for the authenticated user
 *     description: Retrieve todos associated with the authenticated user using a JWT token.
 *     
 *     parameters:
 *       - in: header
 *         name: 'Authorization'
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{ id: 1, task: 'Task 1', completed: false }]
 *       '401':
 *         description: Unauthorized - Missing or invalid JWT token
 *     externalDocs:
 *       description: Find more information about JWT tokens
 *       url: https://jwt.io/introduction/
 */
router.get('/',todoController.getTodos);

// Example route for creating a ToDo item
/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new ToDo item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               
 *     responses:
 *       '201':
 *         description: ToDo item created successfully
 *       '400':
 *         description: Bad request, check the request payload
 */
router.post('/',todoController.insertTodo);


router.get('/:id',todoController.getTodosById);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a ToDo item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: ToDo item updated successfully
 *       '400':
 *         description: Bad request, check the request payload
 *       '404':
 *         description: ToDo item not found
 */
router.put('/:id',todoController.updateTodo);
/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a ToDo item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: ToDo item deleted successfully
 *       '404':
 *         description: ToDo item not found
 */

router.delete('/:id',todoController.deleteTodo);

module.exports = router;