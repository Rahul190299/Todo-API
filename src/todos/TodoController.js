const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../secret');
const queries = require('./query');
const {todoPool} = require('../../db');

function authenticateJWT(req,res,next){
    const token = req.header('Authorization');
    console.log(token);
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        console.log(decoded);
        req.user = decoded;
        next();
    });
}

async function getTodos(req,res){
    try {
        const { user_id } = req.user;
        const { rows } = await todoPool.query(queries.getTodos, [user_id]);
        res.json(rows);
    } catch (error) {
        console.error('Error while fetching todos:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getTodosById(req,res){
    try {
        const { user_id } = req.user;
        const { id } = req.params;
        const { rows } = await todoPool.query(queries.getTodoById, [id,user_id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error while fetching todos:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateTodo(req,res){

    try {       
        const { id } = req.params;
        const { completed } = req.body;
        const { user_id } = req.user;
        const { rows } = await todoPool.query(queries.updateTodo, [completed, id, user_id]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error while updating todo:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteTodo(req,res){
    try {
        const { id } = req.params;
        const { user_id } = req.user;
        await todoPool.query(queries.deleteTodo, [id, user_id]);
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error while deleting todo:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function insertTodo(req,res){
    try {
        const { descreption } = req.body;
        const { user_id } = req.user;
        const { title} = req.body;
        const { rows } = await todoPool.query(queries.insertTodo, [descreption,title, user_id]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error while creating todo:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function paginationAndSearch(req,res){
    try {
        const { user_id } = req.user;
        const { page = 1, limit = 10, search = '' } = req.query;

        // Calculate offset based on pagination parameters
        const offset = (page - 1) * limit;

        // Assuming 'task' is the column you want to search in
        const query = queries.paginationAndSearch;

        const { rows } = await todoPool.query(query, [user_id, `%${search}%`, limit, offset]);

        res.json(rows);
    } catch (error) {
        console.error('Error while fetching todos:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    authenticateJWT,
    getTodos,
    getTodosById,
    updateTodo,
    deleteTodo,
    paginationAndSearch,
    insertTodo,
}