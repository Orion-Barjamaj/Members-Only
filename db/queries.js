const { use } = require('passport');
const pool = require('./pool');

async function getUser(username) {
    const {rows} = await pool.query('SELECT * FROM users WHERE username = $1;', [username]);
    return rows;
}

async function addUser(firstName, lastName, username, password) {
    await pool.query('INSERT INTO users (firstname, lastname, username, password, ismember) VALUES ($1, $2, $3, $4, $5)', [firstName, lastName, username, password, false])
}

async function addMessage(message, creator, date){
    await pool.query('INSERT INTO messages (message, creator, date) VALUES ($1, $2, $3)', [message, creator, date]);
}

async function getAllMessages(){
    const {rows} = await pool.query('SELECT * FROM messages ORDER BY date DESC;');
    return rows;
}

async function updateUser(id) {
    await pool.query('UPDATE users SET ismember = TRUE WHERE id = $1;', [id]);
}

module.exports = {
    getUser,
    addUser,
    addMessage,
    getAllMessages,
    updateUser
}