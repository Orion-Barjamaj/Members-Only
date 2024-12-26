const queries = require('../db/queries');

module.exports = {
    get: (req, res) => {
        res.render('../views/addMessage');
    },
    post: (req, res) => {
        const date = new Date();
        const messageCreatedOn = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        const user = req.user;
        queries.addMessage(req.body.message, user.firstname + ' ' + user.lastname, messageCreatedOn);
        res.redirect('/HomePage');
    }   
}