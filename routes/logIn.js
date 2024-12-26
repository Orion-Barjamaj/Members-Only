const express = require("express");
const router = express.Router();
const controller = require("../controllers/logInController");

router.get('/log-in', controller.get);

module.exports = router;