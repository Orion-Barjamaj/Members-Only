const queries = require('../db/queries');

module.exports = {
    get: async (req, res) => {
        const messages = await queries.getAllMessages();
        console.log(messages);
        console.log("this is user", req.user);
        res.render('../views/homepage', {user: req.user, messages: messages});
    },
}