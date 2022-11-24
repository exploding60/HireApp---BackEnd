const express = require("express");
const router = express.Router();
const {UsersController} = require("./../controller/login_users");
const {profile} = require("./../middlewares/auth")
//router.post('/register/:profile',profile, UsersController.insert);
router.post('/login', UsersController.login);
//router.get('/:email/:otp', UsersController.otp);


module.exports = router;