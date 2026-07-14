import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(` Database Connection Error: ${error.message}`);

    process.exit(1);
  }
};

export default connectToDb;