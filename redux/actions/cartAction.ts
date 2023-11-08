import axios from "axios"
 
import toast from "react-hot-toast";
import { AppDispatch } from "../store";
import { addTocart, revmoveToCart } from "../slices/cartSlice";
 
//add to cart
export const addItemsToCart = (id:string,quantity:number) => async (dispatch:AppDispatch,getState:any)=>{
try {
    const product = getState().products.products.filter((product:any) => product?._id === id) || []
    dispatch(addTocart({product:product[0],quantity}))
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cart.cartItems))  
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