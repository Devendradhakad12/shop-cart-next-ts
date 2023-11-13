import axios from "axios";

import toast from "react-hot-toast";
import {
  errorRecived,
  productLoading,
  productRecived,
} from "../slices/product-slice";
import { AppDispatch } from "../store";

interface getProductProps {
  keyword?:string;
  currentPage?:number;
  price?:[number,number];
  category?:string | null | undefined
}

// get product
export const getProduct =
  (
 {keyword="",currentPage=1,price=[0,9000000000],category}:getProductProps
  ) =>
  async (dispatch: any) => {
    let link = `/api/product/all?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    if (category) {
      link = `/api/product/all?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
    }
    try {
      dispatch(productLoading());
      const { data } = await axios.get(link);
      dispatch(productRecived(data));
      return
    } catch (error: any) {
      dispatch(errorRecived(error));
      return
    }
  };
 