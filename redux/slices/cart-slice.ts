import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    cartItems:typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("cartItems")! || "[]")! : [] // JSON.parse(localStorage.getItem("cartItems")!)!  || [],
   
  },

 
};
const addToCartSlice = createSlice({ 
  name: "cart",
  initialState,
  reducers: {
    addTocart(state, action) { 
       const item = action.payload;
       const itemexist = current(state).cart.cartItems.filter((i:any)=>i.product._id === item.product._id)
       if(itemexist.length){
         state.cart.cartItems = current(state).cart.cartItems.map((i:any)=>i.product._id === item.product._id ? item : i )
       }else{
        state.cart.cartItems = [...state.cart.cartItems,item]
       }
    },
    revmoveToCart(state,action){
        const item = action.payload;
        const removeItem = current(state).cart.cartItems.filter((i:any)=>i.product._id !== item.id)
        state.cart.cartItems = removeItem
    },
   

  },
}); 

export const {addTocart,revmoveToCart } = addToCartSlice.actions

export default addToCartSlice.reducer;
  