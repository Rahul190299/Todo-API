const express = require("express");
const router = express.Router();
const userController = require('./controller');

/** POST Methods */
    /**
     * @openapi
     * '/user/register':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: Create a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              
     *              - email
     *              
     *            properties:
     *              
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *              
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.post("/register",userController.registerUser);

router.post("/login",userController.loginUser);



module.exports = router;