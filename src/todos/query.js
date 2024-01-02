const getTodos = "SELECT * FROM todos WHERE user_id = $1";
const getTodoById = "SELECT * FROM todos WHERE todo_id = $1 AND user_id = $2"
const updateTodo = "UPDATE todos SET completed = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *";
const deleteTodo = "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2";
const insertTodo = "INSERT INTO todos (descreption,title, user_id) VALUES ($1, $2,$3) RETURNING *";
const paginationAndSearch= "SELECT * FROM todos WHERE user_id = $1 AND task ILIKE $2 ORDER BY todo_id LIMIT $3 OFFSET $4";
module.exports = {
    getTodos,
    updateTodo,
    deleteTodo,
    insertTodo,
    getTodoById,
    paginationAndSearch,

}