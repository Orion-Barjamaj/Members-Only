const express = require('express');
const router = express.Router();
const controller = require('../controllers/becomeMemberController');
const isAuth = require('./authMiddleware').isAuth;

router.get('/Become-Member', isAuth, controller.get);
router.post('/Become-Member', isAuth, controller.post);

module.exports = router;