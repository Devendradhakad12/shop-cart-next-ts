import { SatelliteAlt } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  products: [],
  loading:true,
  error:false,
  resultPerPage:0
 
 
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers:  {
    productLoading(state){
       if(state.loading === false){
        state.loading = true
       }
    },
    productRecived(state,action){
        if(state.loading === true){ 
            state.loading = false
            state.error=false
            state.products = action.payload.products
            state.resultPerPage = action.payload.resultPerPage
       
           }
    },
    errorRecived(state,action){
        if(state.loading === true){
            state.loading = false
            state.error = action.payload
           }
    },
    clearError(state,action){
        state.error = false
    },
    


  }
});
export const { productLoading ,productRecived,errorRecived,clearError } = productSlice.actions;

export default productSlice.reducer;


 