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
    enum:["phones","laptops","cloths","gadgets","toys","food","beauty","sports"]
  },
  brand: String,
  images: [
    {
        type:String,
        required:true
    }
  ],
 
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  stock: { 
    type: Number,
    required: true,
  },
 
  sold: {
    type: Number,
    default: 0,
  },

 

},{timestamps:true});


export const Product = models.Product || mongoose.model("Product",productSchema)