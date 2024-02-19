import mongoose from "mongoose";


if (!process.env.MONGODB_URI) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

const connection = {} /* creating connection object*/

async function connectDB() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return
  }

  /* connecting to our database */
  const db = await mongoose.connect(process.env.MONGODB_URI)

  connection.isConnected = db.connections[0].readyState
}

export default connectDB;