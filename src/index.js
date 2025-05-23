import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import dbConnection from "./dbConnection/connectDb.js";
import authrouter from "./router/authrouter.js";
import path from "path";
import productRouter from "./router/productUploaderRouter.js";
import getRouter from "./router/getRouters.js";
const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await dbConnection();

    app.listen(PORT, () => {
      console.log(`sever is running at ${PORT}`);
    });
  } catch (error) {
    console.log(`severConnection failed ${error}`);
  }
};
startServer();

app.use("/api/auth", authrouter);
app.use("/api", productRouter);
app.use("/api", getRouter);
