import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, getProduct } from '../../redux/apiRequest';
import { getIdSuccessfully } from '../../redux/productSlice';
import '../css/namepage.css';

function Science(props) {
    const [user, setUser] = useState(useSelector((state) => state.auth.login?.currentUser))
    const [product, setProduct] = useState(useSelector((state) => state.product?.product))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        getProduct(dispatch)
    }, [])
    const handleClick = (value) => {
        dispatch(getIdSuccessfully(value))
        console.log(value);
    }
    const handleAdd = (value) => {
        addToCart(user?.accessToken, user?.username, value._id, dispatch, navigate)
    }
    return (

        <div className="container">
            <h1 className="namepage">Science</h1>
            <hr />
            <div className="row mt-4 mb-4">
                {product ? product?.map((item) => {
                    if (item.classify === "science" || item.classify === "Science") {
                        return (
                            <div className="col-sm-6 col-lg-3">
                                <div className="container product">
                                    <div className="tren">
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className="duoi">
                                        <div className="productname">{item.classify}</div>
                                        <div className="productprice">{item.productprice}</div>
                                        <div className="description">{item.productname}</div>
                                        <div className="btn-pr">
                                            <Link to="/details" className="btn btn-danger" onClick={() => handleClick(item)}><i className="fa fa-bullseye" aria-hidden="true" /> details</Link>
                                            <div className="btn btn-warning" onClick={() => handleAdd(item)}><i className="fa fa-cart-arrow-down" aria-hidden="true" /> add to cart</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }) : <h1>Loading...</h1>
                }
            </div>
        </div>
    );
}

export default Science;