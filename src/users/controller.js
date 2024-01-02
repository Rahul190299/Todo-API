const queries = require("./queries");
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../secret');
const {userPool} = require('../../db');


async function loginUser(req,res){
    try {
        const {email} =req.body;
        const result  = await userPool.query(queries.getUserByEmail,[email]);
        if(row.length == 0){
            res.status(200).json({ message : "user does not exists"})
        }
        const user_id = result.rows.user_id;
        const token = jwt.sign({ email,user_id }, SECRET_KEY);
        res.status(200).json({token});

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
    

}
async function registerUser(req,res){
    const { email } = req.body;
    
    try {

        const {rows} = await userPool.query(queries.register,[email]);
        
        const user_id = rows[0].user_id;
        const token = jwt.sign({ email,user_id }, SECRET_KEY);
        res.status(200).json({token});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
    
}

module.exports = {
    registerUser,
    loginUser,
}
