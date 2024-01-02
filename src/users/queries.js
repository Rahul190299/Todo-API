const getUserById = "SELECT * FROM users WHERE id =$1";
const getAllUsers = "SELECT * FROM users";
const register = "INSERT INTO users (email) VALUES ($1) RETURNING *"
const getUserByEmail = "SELECT * FROM users WHERE email =$1"

module.exports = {getAllUsers,getUserById,register,getUserByEmail};

