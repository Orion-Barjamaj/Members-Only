const queries = require('../db/queries');

module.exports = {
    get: async (req, res) => {
        const messages = await queries.getAllMessages();
        console.log(messages);
        res.render('../views/homepage', {user: req.user, messages: messages});
    },
}