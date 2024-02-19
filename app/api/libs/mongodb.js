import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGODB_URI;


if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

const connection = {} /* creating connection object*/

async function connectDB() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return
  }

  /* connecting to our database */
  const db = await mongoose.connect(DATABASE_URL)

  connection.isConnected = db.connections[0].readyState
}

export default connectDB;