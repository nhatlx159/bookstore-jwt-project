import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/namepage.css';
import './css/incart.css';
import Incart from './Incart';
import { useSelector } from 'react-redux';
import axios from 'axios';
function Cart(props) {
    const [cart, setCart] = useState(useSelector((state) => state.cart.getCart?.cart))
    const [user, setUser] = useState(useSelector((state) => state.auth.login?.currentUser))
    const [data, setData] = useState(null)
    useEffect(() => {
        axios.get("http://localhost:8081/user/cart", {
            headers: {
                token: `Bearer ` + user?.accessToken,
                username: user?.username
            }
        }).then((res) => setData(res.data))
    }, [data])
    const display = () => {
        if (!data) {
            return (
                <div class="lds-hourglass"></div>
            )
        }
        return <Incart data={data} />
    }
    const pay = () => {
        let money = 0
        for (let i = 0; i < data?.length; i++) {
            if (data[i] !== "") {
                const item = data[i]?.productprice;
                const spl1 = item.split(" ")[0]
                const spl2 = spl1.split(".")[0]
                money = parseInt(money) + parseInt(spl2)
            }
        }
        return parseInt(money) + ".000 vnđ"
    }
    const checkUser = () => {
        if (!user) {
            return "/login"
        } else if (pay() === "0.000 vnđ") {
            return "/"
        } else {
            return "/payment"
        }
    }
    const orderCheck = () => {
        if (!user) {
            return "/login"
        } else {
            return "/oddetails"
        }
    }
    return (
        <div className="container">
            <h1 className="namepage">Cart</h1>
            <Link to={orderCheck()} className="mb-4 mt-2 arrow-shopping"><i class='fa fa-arrow-right'></i> Order page</Link>
            <hr />
            <div className="cart">
                <div className="row row1">
                    <div className="col-1">Number</div>
                    <div className="col-3">Image</div>
                    <div className="col-3">Name</div>
                    <div className="col-2">Price</div>
                    <div className="col-3">Manipulation</div>
                </div><hr />
            </div>
            {display()}
            <p className="total float-right">Total: {pay()}</p><br />
            <div className="container mt-4">
                <Link to="/" className="mb-4 mt-2 arrow-shopping"><i className="fa fa-arrow-circle-left" aria-hidden="true"></i> Back to store</Link>
                <Link to={checkUser()} className="btn btn-warning float-right mr-4">Payments</Link>
            </div>
        </div>
    );
}

export default Cart;