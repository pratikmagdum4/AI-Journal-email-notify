const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const emailRoutes = require('./routes/emails');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/emails', emailRoutes);
app.use("/",(req,res)=>{
  console.log("hi there ")
  res.json({message:"Hello from notification server"});
})
// Vercel serverless function handler
if (process.env.VERCEL) {
  module.exports = app;
} else {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}