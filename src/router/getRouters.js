import express from "express";
import {
  getAllOrder,
  getAllProduct,
  productDetails,
  singleProduct,
} from "../controller/getController.js";

const getRouter = express.Router();

getRouter.get("/product", getAllOrder);
getRouter.get("/all-product", getAllProduct);
getRouter.get("/item/:id", singleProduct);
getRouter.get("/productdetail/:id", productDetails);

export default getRouter;
