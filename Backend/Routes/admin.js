const express = require('express');
const router = express.Router();
const { requestAdminRole } = require('../Controllers/adminController');

router.post('/request-role', requestAdminRole);

module.exports = router;
