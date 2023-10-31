import mongoose, { models } from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: String,
    // Allow users to upvote and downvote reviews
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
  
    // Track the date the review was posted
    createdAt: {
      type: Date,
      default: Date.now,
    },
  
    // Allow users to mark reviews as helpful or unhelpful
    helpfulVotes: {
      type: Number,
      default: 0,
    },
    unhelpfulVotes: {
      type: Number,
      default: 0,
    },
  
    // Include images or attachments with reviews
    attachments: [String],
  });


  export const Review = models.Review || mongoose.model("Review",reviewSchema)