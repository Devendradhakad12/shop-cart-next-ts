import { configureStore } from "@reduxjs/toolkit";
import  productSlice  from "./slices/product-slice";
import cartSlice from "./slices/cartSlice";
import userToken from "./slices/user-token";
export const store = configureStore({
    reducer:{
       products:productSlice ,
    cart:cartSlice,
    userToken:userToken
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch