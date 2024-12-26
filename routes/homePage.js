const express = require("express");
const router = express.Router();
const controller = require("../controllers/homePageController");

router.get('/sign-up', controller.get);
router.post('/sign-up', controller.post);

module.exports = router;