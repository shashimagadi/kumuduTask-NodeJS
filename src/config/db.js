const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
    console.log(process.env.MONGO_URL,"url")
  try {
    await mongoose.connect(process.env.MONGO_URL);
     console.error("MongoDB connected successfully" );
  } catch (e) {
    console.error("MongoDB connection error:", e.message);
    process.exit(1);
  }
};
module.exports = connectDB;
