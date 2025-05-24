import mongoose from "mongoose";
import orderplace from "../model/orderModel.js";
import ProductUploder from "../model/productModel.js";
import productUploader from "./productUploaderController.js";
export const getAllOrder = async (req, res) => {
  try {
    const allOrder = await orderplace.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "orderby",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },

      {
        $project: {
          _id: 0,
          orderId: "$_id",
          userName: "$userDetails.name",
          userEmail: "$userDetails.email",
          DeliveryStatus: "$DeliveryStatus",
          orderDate: "$createdAt",
          productName: "$productDetails.productTitle", // or name
          productPrice: "$allOrder.price",
          quantity: "$allOrder.quantity",
          paymentStatus: "$allOrder.PeymentMetod",
          DeliveryStatus: "$allOrder.DeliveryStatus",
          totalItemPrice: {
            $multiply: ["$allOrder.Price", "$allOrder.quantity"],
          },
          productImage: {
            $cond: {
              if: { $isArray: "$productDetails.productImages" },
              then: { $arrayElemAt: ["$productDetails.productImages", 0] },
              else: "$productDetails.productImages", // fallback if only a single image field
            },
          },
        },
      },
    ]);

    return res.json({
      success: true,
      message: "get allOrder Successfull",
      products: allOrder,
    });
  } catch (error) {
    return res.json({
      success: false,
      mesaage: `something error in getAllOrder ${error}`,
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const allProduct = await ProductUploder.find({});
    return res.json({ success: true, allProduct: allProduct });
  } catch (error) {
    console.log(`getallproduct faield ${error}`);
  }
};

export const singleProduct = async (req, res) => {
  console.log(req.params.id);
  try {
    const singleItem = await ProductUploder.findById(req.params.id);
    if (!singleItem) {
      return res.json({ success: false, meassage: "single Product not fond" });
    }
    return res.json({ success: true, item: singleItem });
  } catch (error) {
    console.log(error);
  }
};

export const productDetails = async (req, res) => {
  const quantity = req.body?.quantity || 1;

  try {
    const productdetail = await ProductUploder.findById(req.params.id);

    if (!productdetail) {
      return res.json({ success: false, message: "Product not found" });
    }

    const basePrice = productdetail.productPrice || 0;
    const discount = productdetail.discount; // assuming 30% discount
    console.log(discount);
    const discounted = Math.floor((basePrice * discount) / 100) * quantity;

    const gstRate = 18; // 18% GST

    // Price after discount
    const afterDiscounts = basePrice * quantity - discounted;
    const afterDiscount = Math.floor(afterDiscounts);

    // GST on discounted price

    // Delivery charge conditionally
    const deliveryCharge = afterDiscount * quantity >= 2000 ? 0 : 120;

    const totalAmount = Math.floor(afterDiscount + deliveryCharge);

    return res.json({
      success: true,
      Productdetails: {
        basePrice,
        discounted,
        afterDiscount,
        deliveryCharge,
        totalAmount,
      },
      product: {
        productImage: productdetail.productImages,
        productName: productdetail.productTitle,
      },
    });
  } catch (error) {
    console.error("Error in productDetails:", error);
    return res.status(500).json({
      success: false,
      message: `Product details fetch failed: ${error.message}`,
    });
  }
};

export const OrderPlaceDetails = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.id);
  console.log(typeof userId);

  try {
    const order = await orderplace.aggregate([
      {
        $match: {
          orderby: userId, // Filter orders by user
        },
      },
      {
        $lookup: {
          from: "users", // 👈 Make sure this matches your actual MongoDB collection name
          localField: "orderby",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $lookup: {
          from: "productitems", // 👈 Should match your ProductItem collection name (usually plural lowercase)
          localField: "singleOrder.product",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          "shippingAddress.state": 1,
          "singleOrder.quantity": 1,
          "singleOrder.Price": 1,
          "singleOrder.totalPrice": 1,
          "singleOrder.DeliveryStatus": 1,
          "singleOrder.PaymentStatus": 1,
          "userInfo.name": 1,
          "userInfo.email": 1,
          "productInfo.productTitle": 1,
          "productInfo.productImages": 1,
          "productInfo.productBrandName": 1,
        },
      },
      {
        $sort: {
          createdAt: -1, // Optional: sort latest orders first
        },
      },
      { $limit: 1 },
    ]);
    console.log(order);
    return res.json({ message: "successfully send", orders: order });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const productDetails = async (req, res) => {
//   const { quantity = 1 } = req.body;
//   try {
//     const productdetail = await ProductUploder.findById(req.params.id);
//     if (!productdetail) {
//       return res.json({ success: false, mesaage: "product cant find" });
//     }
//     const qty = quantity;
//     const basePrice = productDetails.productPrice || 0;
//     const discount = 30;
//     const getGst = 18;
//     const afterDiscount = (basePrice / discount) * qty;
//     const afterGst = (afterDiscount * getGst) / 100;
//     const deliveryCharge = Price * quantity >= 5000 ? 0 : 120;

//     const totalAmount = afterDiscount + afterGst + deliveryCharge;

//     return res.json({
//       success: true,
//       Productdetails: {
//         basePrice,
//         discount,
//         getGst,
//         afterDiscount,
//         afterGst,
//         deliveryCharge,
//         totalAmount,
//       },
//       product: {
//         productImage: productdetail.productImage,
//         productName: productdetail.productName,
//       },
//     });
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: `product Details fetch failed ${error}`,
//     });
//   }
// };

export const OrderList = async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.user.id);
  try {
    const allOrder = await orderplace.aggregate([
      { $match: { orderby: id } },

      {
        $lookup: {
          from: "users",
          localField: "orderby",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $lookup: {
          from: "productitems",
          localField: "singleOrder.product",
          foreignField: "_id",
          as: "OrderList",
        },
      },
      {
        $unwind: "$OrderList",
      },
      {
        $project: {
          _id: 1,
          productImages: "$OrderList.productImages",
          productTitle: "$OrderList.productTitle",
          "singleOrder.DeliveryStatus": 1,
          "singleOrder.quantity": 1,
          "singleOrder.totalPrice": 1,
          "siggleOrder.DeliveryStatus": 1,
        },
      },
    ]);
    return res.json({ success: true, orderlist: allOrder });
  } catch (error) {
    return res.json({
      success: false,
      message: `something is error in Orderlist ${error}`,
    });
  }
};
const similerProduct = async (req, res) => {
  try {
    const similer = await productUploader.find({});
  } catch (error) {}
};
