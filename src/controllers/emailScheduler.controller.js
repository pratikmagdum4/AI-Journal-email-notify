const emailSchedulerService = require('../services/emailScheduler.service');

class EmailSchedulerController {
  scheduleEmail(req, res) {
    try {
      const { dateTime, recipient, subject, description } = req.body;
      
      if (!dateTime || !recipient || !subject || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const id = Date.now().toString();
      emailSchedulerService.scheduleEmail(id, dateTime, recipient, subject, description);
      
      res.status(201).json({ 
        message: 'Email scheduled successfully',
        id: id,
        scheduledFor: dateTime
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to schedule email ,the error is ' +error});
    }
  }

  cancelEmail(req, res) {
    try {
      const { id } = req.params;
      const cancelled = emailSchedulerService.cancelScheduledEmail(id);
      
      if (cancelled) {
        res.json({ message: 'Scheduled email cancelled successfully' });
      } else {
        res.status(404).json({ error: 'Scheduled email not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to cancel scheduled email' });
    }
  }

  getScheduledEmails(req, res) {
    try {
      const scheduledEmails = emailSchedulerService.getScheduledEmails();
      res.json({ scheduledEmails });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get scheduled emails' });
    }
  }
}

module.exports = new EmailSchedulerController();