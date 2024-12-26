const queries = require('../db/queries');
var bcrypt = require('bcryptjs');

module.exports = {
    get: (req, res) => {
        res.render('../views/sign-up');
    },
    post: (req, res, next) => {
        console.log(req.body);
        const {firstName, lastName, username} = req.body;
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if(err){
                res.redirect('/');
            }else{
                queries.addUser(firstName, lastName, username, hashedPassword);
                res.redirect('/')
            }
        });
    }
}