const express = require('express');
const router = express.Router();
const { sendMail } = require('../controllers/mailController');

// POST /api/send-mail
router.post('/send-mail', sendMail);

module.exports = router;

