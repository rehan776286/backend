import mongoose from "mongoose";

// const orderItemSchema = mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "ProductItem",
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     default: 1,
//     min: 1,
//   },
//   Price: {
//     type: Number,
//     required: true,
//   },
//   totalPrice: {
//     type: Number,
//     required: true,
//   },
//   DeliveryStatus: {
//     type: String,
//     enum: ["pending", "shipedd", "out for delivery", "delivered", "cancelled"],
//     default: "pending",
//     required: true,
//   },
//   PeymentMetod: {
//     type: String,
//     enum: ["cod", "upi", "creditCard", "bank"],
//     default: "cod",
//     required: true,
//   },
//   PaymentStatus: {
//     type: String,
//     enum: ["pending", "completed", "failed", "refunded"],
//     default: "pending",
//     required: true,
//   },
//   RefundItem: {
//     type: String,
//     enum: ["not applicable", "pending", "refunded"],
//     default: "not applicable",
//   },

//   refundAmount: {
//     type: Number,
//     default: 0,
//   },
//   refundedAt: {
//     type: Date,
//   },
//   DeliveryCharge: {
//     type: Number,
//     default: 0,
//   },
// });

const orderPlaceSchema = mongoose.Schema(
  {
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    singleOrder: {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductItem",
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
      },
      Price: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: false,
        default: 0,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      DeliveryStatus: {
        type: String,
        enum: [
          "Order Placed", // Order placed, awaiting processing
          "Processing", // Order is being prepared
          "Shipped", // Order has been shipped
          "Out for delivery", // Order is out with the delivery agent
          "delivered", // Order has been delivered
          "cancelled",
        ],
        default: "Order Placed",
        required: true,
      },
      PeymentMethod: {
        type: String,
        enum: ["cod", "upi", "creditCard", "bank"],
        default: "cod",
        required: true,
      },
      PaymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
        required: true,
      },
      RefundItem: {
        type: String,
        enum: ["not applicable", "pending", "refunded"],
        default: "not applicable",
      },

      refundAmount: {
        type: Number,
        default: 0,
      },
      refundedAt: {
        type: Date,
      },
      DeliveryCharge: {
        type: Number,
        default: 0,
      },
    },
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },
      mobileNumber: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
      },
      locality: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
        required: false,
      },
      altMobile: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true }
);
const orderplace = mongoose.model("orderPlace", orderPlaceSchema);

export default orderplace;
