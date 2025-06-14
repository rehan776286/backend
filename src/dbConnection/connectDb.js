import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductUploder from "../model/productModel.js";
import orderplace from "../model/orderModel.js";
import User from "../model/userModel.js";
dotenv.config();

const dbConnection = async () => {
  try {
    const dbconnect = await mongoose.connect(process.env.DBURL);

    console.log(`mongodb has connect at ${dbconnect.connection.host}`);

    await Promise.all([
      ProductUploder.syncIndexes(),
      User.syncIndexes(),
      // orderplace.syncIndexes(),
    ]);
  } catch (error) {
    console.log(`mongodb dbconnection error ${error}`);
  }
};

export default dbConnection;
