import jwt from "jsonwebtoken";
const authGetToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({
      success: false,
      message: "cookie token not found authGetToken",
    });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (!tokenDecode) {
      return res.json({ success: false, message: "token verified failed" });
    }

    req.user = tokenDecode;
    next();
  } catch (error) {
    return res.json({ success: false, message: "authGetToken failed" });
  }
};
export default authGetToken;
