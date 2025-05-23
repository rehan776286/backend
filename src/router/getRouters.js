import express from "express";
import {
  getAllOrder,
  getAllProduct,
  OrderList,
  OrderPlaceDetails,
  productDetails,
  singleProduct,
} from "../controller/getController.js";
import authGetToken from "../middelware/AccessToken.js";

const getRouter = express.Router();

getRouter.get("/product", getAllOrder);
getRouter.get("/all-product", getAllProduct);
getRouter.get("/item/:id", singleProduct);
getRouter.post("/productdetail/:id", productDetails);
getRouter.get("/orderdetails", authGetToken, OrderPlaceDetails);
getRouter.get("/orderlist", authGetToken, OrderList);

export default getRouter;
