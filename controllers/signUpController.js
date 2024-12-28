const queries = require('../db/queries');
var bcrypt = require('bcryptjs');
const { query, validationResult, body, matchedData, checkSchema } = require('express-validator');

const validateUser = [
    body("firstName").trim().notEmpty().withMessage("First name should not be empty."),
    body("username").trim().notEmpty().withMessage("Username should not be empty."),
    body("lastName").trim().notEmpty().withMessage("Last name should not be empty."),
    body("password").trim().isLength({min: 8}).withMessage("Password should be at least 8 characters."),
    body("confirmPassword").trim().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords should match.");
        }
        return true;
    })
];

module.exports = {
    get: (req, res) => {
        res.render('../views/sign-up', {inputData: req.body});
    },
    post: [validateUser,
        async (req, res, next) => {
            const result = validationResult(req);
            if(!result.isEmpty()){
                res.render('../views/sign-up', {errors: result.array(), inputData: req.body})
            }else {
                const {firstName, lastName, username} = req.body;
                bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
                if(err){
                    res.redirect('/');
                }else{
                    await queries.addUser(firstName, lastName, username, hashedPassword);
                    res.redirect('/log-in')
                }
            });
        }
    }],
}