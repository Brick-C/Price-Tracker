import mongoose from "mongoose";

let isConnected = false; //to track connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", false);

  if (!process.env.MONGODB_URI) {
    return console.error("MongoDB URI not found");
  }
  if (isConnected) return console.log("connected to existing DB");

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
};
