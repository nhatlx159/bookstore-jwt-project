import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getOrderUpdate } from '../../redux/adminSlice';
import '../css/namepage.css';
import '../css/payment.css';

function AllOrder(props) {
    const [user, setUser] = useState(useSelector((state) => state.auth.login?.currentUser));
    const [data, setData] = useState(useSelector((state) => state.admin.getOrders?.data));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user?.admin || !user) {
            navigate("/");
        }
    }, []);

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
    const handleClick = (value)=>{
        dispatch(getOrderUpdate(value));
    }
    return (
        <div className='container'>
            <h1 className="namepage">Admin - check orders</h1>
            <hr />
            {
                data ? data.map((value, key) => {
                    if (value) {
                        return (
                            <div className="col">
                                <h3 className='mt-4'>Order Details</h3>
                                {checkTransport(value)}
                                <small><Link to="/admin/setorder" onClick={()=>handleClick(value)}>Update</Link></small>
                                <hr />
                                <p>FullName: {value.fullname}</p>
                                <p>Phone: {JSON.stringify(value.phone)}</p>
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
                                <hr />
                            </div>)
                    }
                }) : <h3>Loading...</h3>
            }
        </div>
    );
}

export default AllOrder;  