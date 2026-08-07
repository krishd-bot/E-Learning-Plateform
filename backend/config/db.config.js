import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectToDb = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lms"
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

export default connectToDb;
