const express = require('express')
const router = express.Router();

const controller = require('../constoller/StudentController');

// getAll
router.get('/',controller.get);

module.exports = router;