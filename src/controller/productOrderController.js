import orderplace from "../model/orderModel.js";
import ProductUploder from "../model/productModel.js";

const productOrderController = async (req, res) => {
  const quantity = req.body?.quantity || 1;

  const paymentMethod = req.body.paymentMethod;
  const productId = req.params.id;
  console.log(productId);
  const userId = req.user.id;
  if (!paymentMethod) {
    return res.json({ success: false, message: "please choose paymentMethod" });
  }
  try {
    if (!productId) {
      return res.json({
        success: false,
        message: "productitem order id not find ",
      });
    }
    if (!userId) {
      return res.json({ success: false, message: "user not fonded" });
    }
    const product = await ProductUploder.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "product is not  founded" });
    }

    const shippingAddress = req.body?.shippingAddress || null;
    const discountAmount = (product.productPrice * product.discount) / 100;
    const totalPrice = discountAmount * quantity;

    const orderItem = {
      product: productId,
      quantity,
      Price: product.productPrice,
      discount: product.discount,
      totalPrice,
      DeliveryStatus: "pending",
      PeymentMethod: paymentMethod,
      PaymentStatus: "pending",
      RefundItem: "not applicable",
      refundAmount: 0,
      DeliveryCharge: 0,
    };
    await orderplace.create({
      orderby: userId,
      singleOrder: orderItem,
      shippingAddress,
    });
    return res.json({ success: true, message: `order succesfully placed` });
  } catch (error) {
    return res.json({
      success: false,
      message: `productOrderController ${error}`,
    });
  }
};

export default productOrderController;
