const mongoose = require("mongoose");

const mongodbUrl =
  "mongodb+srv://rohitwaghole2013:ecnlTdbVdY0nsnTR@cluster0.y5kym6p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDb = () => {
  return mongoose.connect(mongodbUrl);
};

module.exports = { connectDb };
