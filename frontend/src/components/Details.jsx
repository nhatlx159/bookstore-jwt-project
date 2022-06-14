import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/namepage.css';
import './css/details.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/apiRequest';

function Details(props) {
    window.scrollTo(0, 0);
    const [product, setProduct] = useState(useSelector((state) => state.product?.productInDetails))
    const [user, setUser] = useState(useSelector((state) => state.auth.login?.currentUser))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleAdd = () => {
        addToCart(user?.accessToken, user?.username, product?._id, dispatch, navigate)
        console.log(user?.accessToken, user?.username, product?._id)
    }
    return (

        <div className="container">
            <h1 className="namepage">Details product</h1>
            <hr />
            <div class="row details">
                <div className="col-md-6 col">
                    <img style={{ width: 400, height: 400 }} src={product.image} alt="" />
                </div>
                <div className="col-md-4 col description">
                    <h1>{product.productname}</h1>
                    <div className="category">
                        <b>Category:</b> {product.classify}
                    </div>
                    <div className="author">
                        <b>Author:</b> {product.author}
                    </div>
                    <div className="description">
                        <b>Description:</b> {product.description}
                    </div>
                    <div className="status">
                        <b>status:</b> New 100%
                    </div >
                    <div className="row mt-2">
                        <div className="col-md-5 col-6">
                            <Link to="/" className="arrow-store mt-1"><i className="fa fa-arrow-circle-left" aria-hidden="true"></i> Back to store</Link>
                        </div>
                        <div className="col-md-6 col-4 ml-4">
                            <Link to="/details" className="btn btn-warning" onClick={() => handleAdd()}><i className="fa fa-cart-arrow-down" aria-hidden="true" onClick={() => handleAdd()} /> add to cart</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;