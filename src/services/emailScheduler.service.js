const cron = require('node-cron');
const transporter = require('../config/email.config');

class EmailSchedulerService {
  constructor() {
    this.scheduledJobs = new Map();
  }

  scheduleEmail(id, dateTime, recipient, subject, description) {
    const [date, time] = dateTime.split('T');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');

    const cronExpression = `${minute} ${hour} ${day} ${month} *`;

    const job = cron.schedule(cronExpression, async () => {
      try {
        await this.sendEmail(recipient, subject, description);
        this.scheduledJobs.delete(id);
      } catch (error) {
        console.error('Failed to send email:', error);
      }
    });

    this.scheduledJobs.set(id, job);
    return id;
  }

  async sendEmail(recipient, subject, description) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: recipient,
      subject: subject,
      text: description,
    };

    await transporter.sendMail(mailOptions);
  }

  cancelScheduledEmail(id) {
    const job = this.scheduledJobs.get(id);
    if (job) {
      job.stop();
      this.scheduledJobs.delete(id);
      return true;
    }
    return false;
  }

  getScheduledEmails() {
    return Array.from(this.scheduledJobs.keys());
  }
}

module.exports = new EmailSchedulerService();