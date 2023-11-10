import mongoose, { models } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
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
    totalItem: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "canceled"],
      default: "pending",
    },
    shippingAddress: {
      name: String,
      mobile: Number,
      pincode: Number,
      locality: String,
      city: String,
      state: String,
    },

    // Track the date the order was placed
    createdAt: {
      type: Date,
      default: Date.now,
    },

    // Include payment details, such as payment method, transaction ID, etc.
    payment: {
      razorpay_payment_id: {
        type: String,
        required: true,
      },
      razorpay_order_id: {
        type: String,
        required: true,
      },
      razorpay_signature: {
        type: String,
        required: true,
      },
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
  },
  { timestamps: true }
);

export const Order = models.Order || mongoose.model("Order", orderSchema);
