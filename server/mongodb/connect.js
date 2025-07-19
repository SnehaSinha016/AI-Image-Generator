import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1); 
  }
};

export default connectDB;
