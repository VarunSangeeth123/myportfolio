const mongoose = require("mongoose");

const connectString = process.env.MONGO_URL;

  const connectDB = ()=> mongoose.connect(connectString)
 

  module.exports = connectDB