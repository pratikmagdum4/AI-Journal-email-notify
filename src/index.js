const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const emailSchedulerRoutes = require('./routes/emailScheduler.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/emails', emailSchedulerRoutes);

app.use("/",(req,res)=>{
  console.log("hi there ")
  res.json({message:"Hello from notification server"});
})
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});