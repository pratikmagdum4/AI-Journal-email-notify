const express = require('express');
const cors = require('cors');
require('dotenv').config();

const emailSchedulerRoutes = require('./routes/emailScheduler.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/emails', emailSchedulerRoutes);

app.use("/",()=>{
  console.log("Hello from notification server")
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});