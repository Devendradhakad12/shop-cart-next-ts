'use client'

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Delete, Edit, Flag, MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";

interface ProductTypes {
  _id: string;
  name: string,
  price:number,
  stock: number,
  category: string,
  sold: number,
  date: Date,
  images: {
    public_id:string,
    url:string
  }[],
}

const List = () => {
  const column = [
    "Product Id",
    "Name",
    "Price",
    "Stock",
    "Category",
    "Sold",
    "Image",
  ]
  
  const [products,setProducts] = useState<ProductTypes[]>()
  const [loading,setLoading] = useState(true)
  const [deleteLoad,setDeleteLoad] = useState(false)
  const [page,setPage] = useState(1)
 const [resultPerPage,setResultPerPage] = useState(0)

  const getProducts  = async () =>{
    try {
     setLoading(true)
        const res = await axios.get(`/api/product/all?page=${page}`)
       setProducts(res.data.products)
       setResultPerPage(res.data.resultPerPage)
    } catch (error) {
       console.log(error)
       toast.error("Something went wrong") 
    }finally{
     setLoading(false)
    }
    }
  useEffect(()=>{
       getProducts()
  },[page])
 //console.log(products)
// product delete Handler
const deleteHandler = async(productid:string) =>{
try {
  setDeleteLoad(true)
await axios.delete(`/api/product/${productid}`)
  toast.success("Product Deleted")
 getProducts()
} catch (error) {
  console.log(error)
  toast.error("Something went wrong")
}finally{
  setDeleteLoad(false)
}
}
  

  

  return (
    <div className="m-3">
  {
    loading ? <Loader /> : <>
    {
      products ?     <TableContainer component={Paper} className="table border min-h-[400px]">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>

            {
              column.map((col, i) => (
                <TableCell key={i} className="tableCell text-xl">{col}</TableCell>
              ))
            }
            <TableCell className="tableCell ">Edit</TableCell>
            <TableCell className="tableCell ">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {products.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">  {row.name}</TableCell>
              <TableCell className="tableCell">₹{row.price}</TableCell>
              <TableCell className="tableCell">{row.stock}</TableCell>
              <TableCell className="tableCell">{row.category}</TableCell>
              <TableCell className="tableCell">{row.sold}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper flex justify-start items-center">
                  <img src={row.images[0].url} alt="" className="w-10 h-10" />

                </div>
              </TableCell>
              <TableCell className="tableCell"><Link href={`/admin/product/${row._id}`}><Edit /></Link></TableCell>
              <TableCell className="tableCell"><button onClick={()=>deleteHandler(row._id)} className="disabled:opacity-40" disabled={deleteLoad}><Delete /></button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex gap-10 float-right mr-20 my-10">
        <button disabled={page<=1?true:false} onClick={()=>setPage((pre)=>pre-1)} className=" disabled:opacity-40"><MoveLeft /></button>
        <p>{page}</p>
        <button disabled={products.length>= resultPerPage ?false : true} onClick={()=>setPage((pre)=>pre+1)} className="disabled:opacity-40"><MoveRight /></button>
      </div>
    </TableContainer> : <div className="flex justify-center items-center mt-10">Products Not available</div>
    }
    </>
  }
    </div>
  );
};

export default List;
