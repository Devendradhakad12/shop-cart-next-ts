import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    cartItems:JSON.parse(localStorage.getItem("cartItems")!)  || [],
   
  },

 
};
const addToCartSlice = createSlice({ 
  name: "addToCart",
  initialState,
  reducers: {
    addTocart(state, action) {
       const item = action.payload;
       const itemexist = state.cart.cartItems.filter((i:any)=>i.id === item.productid)
       if(itemexist[0]){
         state.cart.cartItems = state.cart.cartItems.map((i:any)=>i.id === item.id ? item : i )
       }else{
        state.cart.cartItems = [...state.cart.cartItems,item]
       }
    },
    revmoveToCart(state,action){
        const item = action.payload;
        const removeItem = state.cart.cartItems.filter((i:any)=>i.id !== item.productid)
        state.cart.cartItems = removeItem
    },
  

  },
});

export const {addTocart,revmoveToCart } = addToCartSlice.actions

export default addToCartSlice.reducer;
 