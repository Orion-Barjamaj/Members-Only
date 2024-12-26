const express = require("express");
const router = express.Router();
const controller = require("../controllers/homePageController");
const isAuth = require('./authMiddleware').isAuth;

router.get('/HomePage', isAuth, controller.get);

module.exports = router;