import User from "../model/userModel.js";
export const userAddress = async (req, res) => {
  const { address } = req.body;

  const newAddress = address[0];
  console.log(address);

  const requiredFields = [
    "fullName",
    "mobileNumber",
    "pincode",
    "state",
    "city",
    "locality",
    "addressStreet",
  ];

  try {
    if (requiredFields.some((field) => !newAddress[field])) {
      return res.json({ success: false, message: "Something is missing" });
    }

    const userid = req.user.id;

    const user = await User.findById(userid);

    if (!user) {
      return res.json({
        success: false,
        message: "user not found in userAddress",
      });
    }
    user.address.push(newAddress);
    await user.save();
    return res.json({
      success: true,
      message: `userAddress successfully added`,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `something error in userAddress ${error}`,
    });
  }
};

export const addressList = async (req, res) => {
  const userid = req.user.id;
  try {
    const user = await User.findById(userid);
    if (!user && !user.address.lenght) {
      return res.json({ success: false, message: "no address adds" });
    }
    return res.json({
      success: true,
      message: "user address ",
      Address: user.address,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `address list get failed ${error}`,
    });
  }
};

export const deleteAdress = async (req, res) => {
  try {
    const { addressId } = req.body;
    console.log(addressId);
    const userid = req.user.id;
    const user = await User.findById(userid);
    if (!user) {
      return res.json({ succes: false, message: "i could not find user" });
    }
    const deleteAdress = user.address.findIndex(
      (addr) => addr._id.toString() == addressId
    );
    if (deleteAdress == -1) {
      return res.json({ success: false, message: "address not fond" });
    }
    user.address.splice(deleteAdress, 1);
    await user.save();
    return res.json({ success: true, message: "successfully updated" });
  } catch (error) {
    return res.json({ success: false, message: "delete Address failed" });
  }
};
