import axios from "axios"
 
import toast from "react-hot-toast";
import { AppDispatch } from "../store";
import { addTocart, revmoveToCart } from "../slices/cart-slice";
 
//add to cart
export const addItemsToCart = (id:string,quantity:number) => async (dispatch:AppDispatch,getState:any)=>{
try {
    const product = getState().products.products.filter((product:any) => product?._id === id) || []
   // console.log(getState())
    dispatch(addTocart({product:product[0],quantity}))
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cart.cartItems))  
    toast.success("Item added to cart")
} catch (error) {
    console.log(error) 
}
}


// remove from cart
export const removeItemsToCart = (id:string) => async (dispatch:AppDispatch,getState:any)=>{
    try {
        dispatch(revmoveToCart({id}))
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cart.cartItems))
        toast.success("Item removed to cart")
    } catch (error) {
        console.log(error)
    }
    }  