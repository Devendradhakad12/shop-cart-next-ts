import { configureStore } from "@reduxjs/toolkit";
import  productSlice  from "./slices/product-slice";
import cartSlice from "./slices/cart-slice";
import userToken from "./slices/user-token-slice";
import addressSlice from "./slices/address-slice";
import dashboardSlice from "./slices/dashboard-slice";
export const store = configureStore({
    reducer:{
       products:productSlice ,
    cart:cartSlice,
    userToken:userToken,
    address:addressSlice,
    dashboardDetails:dashboardSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch