import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './css/namepage.css';
import './css/payment.css'
function OrderDetails(props) {
    const [user, setUser] = useState(useSelector((state) => state.auth.login?.currentUser));
    const [orders, setOrders] = useState(null)
    useEffect(() => {
        axios.get("http://localhost:8081/user/getorders/" + user?._id, {
            headers: {
                token: "Bearer " + user?.accessToken
            }
        }).then((res) => setOrders(res.data))
    }, [])
    const checkTransport = (value) => {
        if (value.status === "pending") {
            return <small>Status: pending</small>
        } else {
            return (
                <div>
                    <small>Status: {value.status}</small>
                    <small className='mt-2'>Bill of lading code: {value.transport.billOfLadingCode}</small>
                    <small className='mt-2'>Shipping unit: {value.transport.shippingUnit}</small>
                    <small className='mt-2'>Intend time: {value.transport.intendTime}</small>
                </div>
            )
        }
    }
    return (
        <div className="container">
            <h1 className="namepage">Order details page</h1>
            <hr />
            <div className="row">
                {
                    user ? orders?.map((value, key) => {
                        if (value) {
                            return (
                                <div className="col-12 col-12 order_cpn mr-2 ml-3 mt-3">
                                    <h3 className='mt-4'>Order Details</h3>
                                    {checkTransport(value)}
                                    <hr />
                                    <p>FullName: {value.fullname}</p>
                                    <p>Phone: {value.phone}</p>
                                    <p>Address: {value.address}</p>
                                    <p>Payment Method: {value.method}</p>
                                    <p>Order Item: </p>
                                    {value.product.map((value) => {
                                        return (
                                            <p>- {value.productname} x1 : {value.productprice}</p>
                                        )
                                    })}
                                    <hr />
                                    <div className='ml-2 mt-4'>Transport fee: 30.000 vnđ</div>
                                    <div className='ml-2 mt-2 mb-3 font-weight-bold '>Total: {value.total}</div>
                                    <small className='alert'>*Please prepare the amount before receiving the goods</small>
                                </div>)
                        }
                    }) : <h3>Loading...</h3>
                }
            </div>

        </div>
    );
}

export default OrderDetails;