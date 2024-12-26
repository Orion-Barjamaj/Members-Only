const queries = require('../db/queries');
var bcrypt = require('bcryptjs');

module.exports = {
    get: (req, res) => {
        res.render('../views/log-in');
    }, 
}