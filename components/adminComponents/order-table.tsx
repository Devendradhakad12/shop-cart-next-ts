'use client'

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader";
import Image from "next/image";
import { Edit } from "lucide-react";
import { Done } from "@mui/icons-material";
import toast from "react-hot-toast";

const OrdersList = () => {
  const [orders, setOrders] = useState<{ status: string, totalPrice: number, createdAt: string, shippingAddress: { name: string }, orderId: string, _id: string, products: { _id: string, product: { name: string, images: { url: string }[] } }[] }[]>([])
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(false)
  const [orderStatus, setOrderStatus] = useState("")
  const [orderId, setOrderid] = useState("")
  const [updateing, setUpdating] = useState(false)

  const getOrders = useCallback(async () => {
    try {
      setLoading(true)
      const res = await axios.get("/api/orders/all")
      setOrders(res.data)

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getOrders()
  }, [getOrders])

  const statusOptions = ["pending", "processing", "shipped", "delivered", "canceled"]
  const handletStatusUpdate = async (id: string) => {
    try {
      setUpdating(true)
      await axios.put("/api/orders/status-update", { id, status: orderStatus })
      toast.success("Status Updated")
      getOrders()
    } catch (error) {
      console.log(error)
    } finally {
      setEdit(!edit)
      setOrderStatus("")
      setUpdating(false)
    }
  }
  return (
    <TableContainer component={Paper} className="table">
      {
        loading ? <Loader /> :
          <Table sx={{ minWidth: 1300 }} aria-label="simple table">
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
                  <TableCell className="tableCell w-[250px]">
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
                    {
                      edit && orderId === order._id ?


                        <div className="flex justify-center items-center gap-2">      <span>
                          <select id="countries" className={"selectButton"} onChange={(e) => setOrderStatus(e.target.value)} required >
                            <option selected>Choose a Category</option>
                            {
                              statusOptions.map((op, i) => (
                                <option key={i} value={op} className=" capitalize py-2" >{op}</option>
                              ))
                            }

                          </select>
                        </span> <button onClick={() => handletStatusUpdate(order._id)}><Done /></button></div>
                        :
                        <div className={`flex justify-cente gap-2`}>      <span className={`status capitalize ${order.status}`}>{order.status}</span> <button disabled={updateing} className=" disabled:opacity-40" onClick={() => { setEdit(!edit); setOrderid(order._id) }}><Edit /></button></div>
                    }

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
