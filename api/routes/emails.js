const express = require('express');
const router = express.Router();
const Email = require('../models/Email');
const createTransporter = require('../config/email.config');

router.post('/schedule', async (req, res) => {
  try {
    const { dateTime, recipient, subject, description } = req.body;
    
    if (!dateTime || !recipient || !subject || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const scheduledEmail = new Email({
      recipient,
      subject,
      description,
      scheduledFor: new Date(dateTime)
    });

    await scheduledEmail.save();
    
    res.status(201).json({ 
      message: 'Email scheduled successfully',
      // id: scheduledEmail._id,
      scheduledFor: dateTime
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to schedule email,the error is ,'+error });
  }
});

router.get('/scheduled', async (req, res) => {
  try {
    const emails = await Email.find({ status: 'pending' });
    res.json({ scheduledEmails: emails });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get scheduled emails' });
  }
});

router.delete('/cancel/:id', async (req, res) => {
  try {
    const email = await Email.findByIdAndDelete(req.params.id);
    if (!email) {
      return res.status(404).json({ error: 'Scheduled email not found' });
    }
    res.json({ message: 'Scheduled email cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel scheduled email' });
  }
});

module.exports = router;