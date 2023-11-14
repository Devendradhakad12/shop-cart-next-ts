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

const UsersList = () => {
    const [users, setusers] = useState<{ _id: string, name: string, email: string, address: { name: string, city: string, mobile: number, locality: string, pincode: number, state: string } }[]>([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getusers = async () => {
            try {
                setLoading(true)
                const res = await axios.get("/api/auth/users")
                setusers(res.data)

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getusers()
    }, [])

    console.log(users)

    return (
        <TableContainer component={Paper} className="table">
            {
                loading ? <Loader /> :
                    <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="tableCell">User ID</TableCell>
                                <TableCell className="tableCell">Email</TableCell>
                                <TableCell className="tableCell">Name</TableCell>
                                <TableCell className="tableCell">Mobile</TableCell>
                                <TableCell className="tableCell">Address</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users.toReversed().map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell className="tableCell">{user._id}</TableCell>
                                    <TableCell className="tableCell">{user.email}</TableCell>
                                    <TableCell className="tableCell">{user.name}</TableCell>
                                    <TableCell className="tableCell">{user.address.mobile}</TableCell>
                                    <TableCell className="tableCell">
                                      {user.address.name},  {" "}
                                        {user.address.locality}, {" "}
                                         {user.address.city} ,<br/>
                                         {user.address.state}  ,<br />
                                        Mobile - {user.address.mobile} <br />
                                        Pincode - {user.address.pincode}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            }
        </TableContainer>
    );
};

export default UsersList;
