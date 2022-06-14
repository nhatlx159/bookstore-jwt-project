import React, { useEffect, useState } from 'react';
import '../css/namepage.css';
import '../css/deleteproduct.css';
import '../css/incart.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../redux/apiAdminRequest';
import { getProductUpdate } from '../../redux/adminSlice';

function DeleteProduct(props) {
    const [user, setUser] = useState(useSelector((state) => state.auth.login?.currentUser));
    const [product, setProduct] = useState(useSelector((state) => state.product?.product))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user?.admin || !user) {
            navigate("/");
        }
    }, [])
    const handleDelete = (item) => {
        deleteProduct(user?.accessToken, item, dispatch)
    }
    const handleClick = (value) => {
        dispatch(getProductUpdate(value))
    }
    return (
        <div className="container">
            <h1 className="namepage">Admin - editing product</h1>
            <hr />
            <div className="cart">
                <div className="row row1">
                    <div className="col-3">Product ID</div>
                    <div className="col-3">Image</div>
                    <div className="col-3">Name</div>
                    <div className="col-3">Manipulation</div>
                </div><hr />
            </div>
            <div className="cart">
                {
                    product ? product.map((value, key) => {
                        if (value !== "") {
                            return (
                                <div key={key} className="row row2 mt-3">
                                    <div className="col-3" >{value._id}</div>
                                    <div className="col-3"><img src={value.image} alt="" /></div>
                                    <div className="col-3">{value.productname}</div>
                                    <div className="col-3">
                                        <div className="btn-group">
                                            <div className="btn btn-outline-danger" onClick={() => handleDelete(value)}>Remove</div>
                                            <Link to="/admin/updateproduct" onClick={() => handleClick(value)} className="btn btn-outline-info">Update</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }) : <h3>Loading...</h3>
                }</div>
        </div>
    );
}

export default DeleteProduct;  