

const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');
const middlewaresController = require('../app/controllers/MiddlewaresController');
router.post('/register',accountController.registerAccount);
router.post('/login',accountController.loginAccount);
router.post('/refresh',accountController.requestRefreshToken);
router.post('/logout',middlewaresController.verifyToken,accountController.userLogout);
module.exports = router;