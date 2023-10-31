import mongoose from "mongoose";

let connected = false;
export async function connectToDB() {
  mongoose.set("strictQuery", true);
  if (connected) {
    console.log("MongoDB Already Connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB Connected");
    connected = true;
  } catch (error) {
    console.log("MONGODB_CONNECTIO_ERROR", error);
  }
}
