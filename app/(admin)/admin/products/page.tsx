'use client'

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Delete, Edit } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const List = () => {
  
  const [products,setProducts] = useState()
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
       const getProducts  = async () =>{
       try {
           const res = await axios.get("/api/product/all?page=1")
           console.log(res)
       } catch (error) {
          console.log(error)
          toast.error("Something went wrong")
       }
       }
       getProducts()
  },[])

  const rows = [
    {
      _id: 1143155,
      name: "Acer Nitro 5",
      price: 785,
      stock: 23,
      category: "Laptop",
      sold: 34,
      customer: "John Smith",
      date: "1 March",
      method: "Cash on Delivery",
      status: "Approved",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
    },

  ];
  const column = [
    "Product Id",
    "Name",
    "Price",
    "Stock",
    "Category",
    "Sold",
    "Image",

  ]
  return (
    <div className="m-3">
      <TableContainer component={Paper} className="table border min-h-[400px]">
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
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">{row._id}</TableCell>
                <TableCell className="tableCell">  {row.name}</TableCell>
                <TableCell className="tableCell">₹{row.price}</TableCell>
                <TableCell className="tableCell">{row.stock}</TableCell>
                <TableCell className="tableCell">{row.category}</TableCell>
                <TableCell className="tableCell">{row.sold}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper flex justify-start items-center">
                    <img src={row.img} alt="" className="w-10 h-10" />

                  </div>
                </TableCell>
                <TableCell className="tableCell"><Link href={`/admin/product/${row._id}`}><Edit /></Link></TableCell>
                <TableCell className="tableCell"><button><Delete /></button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;
