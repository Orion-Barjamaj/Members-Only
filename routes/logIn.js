const express = require("express");
const router = express.Router();
const controller = require("../controllers/logInController");
const passport = require("passport");

router.get('/log-in', controller.get);
router.post(
    "/log-in",
    passport.authenticate("local", {
      successRedirect: "/HomePage",
      failureRedirect: "/error"
    })
);

router.get('/log-out', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;