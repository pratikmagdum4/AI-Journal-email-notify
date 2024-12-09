const express = require('express');
const router = express.Router();
const emailSchedulerController = require('../controllers/emailScheduler.controller');

router.post('/schedule', emailSchedulerController.scheduleEmail);
router.delete('/cancel/:id', emailSchedulerController.cancelEmail);
router.get('/scheduled', emailSchedulerController.getScheduledEmails);

module.exports = router;