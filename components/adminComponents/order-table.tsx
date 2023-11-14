'use client'

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader";
import Image from "next/image";

const OrdersList = () => {
  const [orders, setOrders] = useState<{ status: string, totalPrice: number, createdAt: string, shippingAddress: { name: string }, orderId: string, _id: string, products: { _id: string, product: { name: string, images: { url: string }[] } }[] }[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true)
        const res = await axios.get("/api/orders/all")
        setOrders(res.data)

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getOrders()
  }, [])

  return (
    <TableContainer component={Paper} className="table">
      {
        loading ? <Loader /> :
          <Table sx={{ minWidth: 1000 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Order ID</TableCell>
                <TableCell className="tableCell">Product</TableCell>
                <TableCell className="tableCell">Customer</TableCell>
                <TableCell className="tableCell">Date</TableCell>
                <TableCell className="tableCell">Amount</TableCell>
                <TableCell className="tableCell">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders && orders.toReversed().map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="tableCell">{order.orderId}</TableCell>
                  <TableCell className="tableCell w-[200px]">
                    <div className="cellWrapper flex  flex-col gap-2 ">

                      {
                        order.products.length && order.products.map((obj) => (
                          <div key={obj._id} className="flex gap-3 items-center">
                            <div>   <Image height={40} width={40} src={obj.product?.images[0]?.url} alt="" className="w-10 h-10" /></div>
                            <h2> {obj.product.name}</h2>
                          </div>
                        ))
                      }

                    </div>
                  </TableCell>
                  <TableCell className="tableCell">{order.shippingAddress.name}</TableCell>
                  <TableCell className="tableCell">{new Date(order.createdAt).toDateString()}</TableCell>
                  <TableCell className="tableCell">₹{order.totalPrice}</TableCell>

                  <TableCell className="tableCell">
                    <span className={`status ${order.status}`}>{order.status}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      }
    </TableContainer>
  );
};

export default OrdersList;
