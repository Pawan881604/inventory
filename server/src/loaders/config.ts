import mongoose from "mongoose";

const db_connection = async () => {
  const url: string | undefined = process.env.DB; // Get the MongoDB URL from environment variables
  if (!url) {
    throw new Error("MongoDB URL (DB) is not defined in environment variables");
  }
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("Something went wrong in DB connection", err);
  }
};

export default db_connection;
