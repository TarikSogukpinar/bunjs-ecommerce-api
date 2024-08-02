import mongoose from "mongoose";

// Connect to the MongoDB database
const mongoDBURI = process.env.MONGODB_URI;

mongoose.connect(mongoDBURI as string);

mongoose.connection.on("connected", () => {
  console.log("Connection to MongoDB established successfully");
});

export default mongoose;
