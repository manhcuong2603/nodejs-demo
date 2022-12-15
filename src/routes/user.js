
const express = require('express');
const router = express.Router();

const middlewaresController = require('../app/controllers/MiddlewaresController');
const userController = require('../app/controllers/UserController');

router.get('/',middlewaresController.verifyToken ,userController.getAllusers);

router.delete('/:id',middlewaresController.verifyTokenAndAdminAuth ,userController.deleteUser);

module.exports = router;