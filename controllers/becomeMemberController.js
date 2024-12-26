const queries = require('../db/queries');

module.exports = {
    get: (req, res) => {
        res.render('../views/becomeMember');
    },
    post: async (req, res) => {
        const secretCode = '11223344';
        const secretEntered = req.body.secretCode;
        if(secretEntered === secretCode){
            await queries.updateUser(req.user.id);
            console.log('I became Member', req.user.ismember);
            res.redirect('/HomePage');
        }else {
            res.send(401);
        }
    }
}