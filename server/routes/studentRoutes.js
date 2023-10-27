const express = require('express');
const router = express.Router();
const { Login,Register,Logout } = require('../controllers/studentControllers.js'); 

router.route('/student/register').post(Register);
router.route('/student/login').post(Login);
router.route('/student/logout').post(Logout);

module.exports = router;

