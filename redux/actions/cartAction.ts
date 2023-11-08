import axios from "axios"
 
import toast from "react-hot-toast";
import { AppDispatch } from "../store";
import { addTocart, revmoveToCart } from "../slices/cartSlice";
 
//add to cart
export const addItemsToCart = (id:string,quantity:number) => async (dispatch:AppDispatch,getState:any)=>{
try {
    const res = await axios.get(`/api/v1/product/${id}`)
    dispatch(addTocart({productid:res.data.product._id,name:res.data.product.name,price:res.data.product.price,image:res.data.product.images[0].url,stock:res.data.product.stock,quantity}))
    localStorage.setItem("cartItems",JSON.stringify(getState().addToCart.cart.cartItems))
    toast.success("item added to cart")
} catch (error) {
    console.log(error) 
}
}


// remove from cart
export const removetemsToCart = (id:string) => async (dispatch:AppDispatch,getState:any)=>{
    try {
        dispatch(revmoveToCart({product:id}))
        localStorage.setItem("cartItems",JSON.stringify(getState().addToCart.cart.cartItems))
        toast.success("item removed to cart")
    } catch (error) {
        console.log(error)
    }
    }