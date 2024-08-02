import mongoose from "mongoose";

// Connect to the MongoDB database
const mongoDBURI = process.env.MONGODB_URI ?? "mongodb://localhost:27017";

mongoose.connect(mongoDBURI);

mongoose.connection.on("connected", () => {
  console.log("Connection to MongoDB established successfully");
});

export default mongoose;
