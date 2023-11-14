import mongoose, { models } from "mongoose";

 
 

const productSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true,
  },
 

  description: String,
  price: {
    type: Number,
    required: true,
  },

  category:{
    type :String,
    enum:["phones","laptops","cloths","gadgets","toys","food","beauty","sports","watch","shoes","bag"]
  },
  brand: String,
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ], 
  ratings:{
   type:Number,
   default:0
  },
 
  numOfReviews: {
    type: Number,
    default: 0,
  }, 
  reviews: [
    { 
       user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
    },
  ],
  stock:{
    type:Number,
    default:1
  },
  sold:{
    type:Number,
    default:0,
  }

},{timestamps:true});


export const Product = models.Product || mongoose.model("Product",productSchema)