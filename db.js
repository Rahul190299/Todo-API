const Pool = require('pg').Pool;

const userPool = new Pool({
    user : "postgres",
    host : "localhost",
    database : "users",
    password : "pass@1234",
    port : 5432,
});

const todoPool = new Pool({
    user : "postgres",
    host : "localhost",
    database : "users",
    password : "pass@1234",
    port : 5432,
})

module.exports = {
    userPool,
    todoPool,
}
