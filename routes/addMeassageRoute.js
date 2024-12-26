const express = require('express');
const router = express.Router();
const controller = require('../controllers/addMessageController');
const isAuth = require('./authMiddleware').isAuth;

router.get('/Add-Message', isAuth ,controller.get);
router.post('/Add-Message', isAuth ,controller.post);

module.exports = router;