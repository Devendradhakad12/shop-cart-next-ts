import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    address:  {
        name: String,
        mobile: Number,
        pincode: Number,
        locality: String, 
        city: String,
        state: String, 
      },
    
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    // Add a list of favorite products for users
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    // Keep track of the user's purchase history
    purchaseHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    // Add a profile picture
    profilePicture: String,
    // Support for user reviews and ratings
    userReviews: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        rating: Number,
        review: String,
      },
    ],
  },
  { timestamps: true }
);

// mongoose.models = {}
export const User = mongoose.models.User || mongoose.model("User", userSchema);
