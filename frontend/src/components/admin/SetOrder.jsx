import React, { useState } from 'react';
import '../css/namepage.css';
import '../css/addproduct.css';
import { updateOrder } from '../../redux/apiAdminRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SetOrder(props) {
    const [user, setUser] = useState(useSelector((state)=> state.auth.login?.currentUser));
    const [order, setOrder] = useState(useSelector((state)=> state.admin.updateOrder?.getOrder));
    const [status, setStatus] = useState(order.status);
    const [ladingCode, setLadingCode] = useState(order.transport.billOfLadingCode);
    const [shippingUnit, setShippingUnit] = useState(order.transport.shippingUnit);
    const [intendTime, setIntendTime] = useState(order.transport.intendTime);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault();
        const body = {
            status: order.status,
            total: order.total,
            username: order.username,
            fullname: order.fullname,
            status: status,
            billOfLadingCode: ladingCode,
            shippingUnit: shippingUnit,
            intendTime: intendTime,
        }
        updateOrder(user?.accessToken, dispatch, user?._id, body, navigate)
    }
    return (
        <div className='container'>
            <h1 className="namepage">Admin - set order</h1>
            <hr />
            <div className="container mt-4 mb-4">
            <div className="form-group k1">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="status">Status</label>
                    <input type="text" onChange={(e) => setStatus(e.target.value)} defaultValue={order.status} className="form-control" name="status" id="status" aria-describedby="helpId" />
                    <label htmlFor="billoflading">Bill of lading code</label>
                    <input type="text" onChange={(e) => setLadingCode(e.target.value)} defaultValue={order.transport.billOfLadingCode} className="form-control" name="billoflading" id="billoflading" aria-describedby="helpId" />
                    <label htmlFor="shippingunit">Shipping unit</label>
                    <input type="text" onChange={(e) => setShippingUnit(e.target.value)} defaultValue={order.transport.shippingUnit} className="form-control" name="shippingunit" id="shippingunit" aria-describedby="helpId" />
                    <label htmlFor="intendtime">Intend time</label>
                    <input type="text" onChange={(e) => setIntendTime(e.target.value)} defaultValue={order.transport.intendTime} className="form-control" name="intendtime" id="intendtime" aria-describedby="helpId" />
                    <button type="submit" className="btn btn-outline-primary margin-auto mt-2">Update</button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default SetOrder;