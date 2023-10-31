import mongoose, { models } from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "canceled"],
      default: "pending",
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      phone:Number
    },
    // Add support for order discounts and coupons
    discount: {
      type: Number,
      default: 0,
    },
  
    // Track the date the order was placed
    createdAt: {
      type: Date,
      default: Date.now,
    },
  
    // Include payment details, such as payment method, transaction ID, etc.
    payment: {
      method: String,
      transactionID: String,
    },
  
    // Support for order returns and refunds
    isReturnRequested: {
      type: Boolean,
      default: false,
    },
    isRefunded: {
      type: Boolean,
      default: false,
    },
  
    // Track the date when the order was shipped and delivered
    shippedAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  
    // Include delivery tracking information
    trackingInfo: {
      carrier: String,
      trackingNumber: String,
      trackingLink: String,
    },
  
    // Support for order notes or messages
    notes: String,
  });

  export const Order = models.Order || mongoose.model("Order",orderSchema)