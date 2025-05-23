import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
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
    addressStreet: {
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

    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
);

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    maxlength: [20, "Username must be less then 20 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "password must be more then 8 characters"],
    // maxlength: [16, "password must be less then 16 characters"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
  },
  isUserVerified: {
    type: Boolean,
    default: false,
  },
  otpVerify: {
    type: String,
    default: null,
  },
  otpExpiry: {
    type: Number,
    default: 0,
  },
  passwordResetOtp: {
    type: String,
    default: null,
  },
  passwordResetOtpExpiry: {
    type: Number,
    default: 0,
  },
  address: [addressSchema],
});

const User = mongoose.model("User", userSchema);

export default User;
