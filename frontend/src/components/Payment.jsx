import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { payment } from '../redux/apiRequest';
import '../ui/css/section.css';

function Payment(props) {
    window.scrollTo(0, 0);
    const [user, setUser] = useState(useSelector((state) => state.auth.login?.currentUser))
    const [cart, setCart] = useState(useSelector((state) => state.cart?.getCart))
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState(user?.phone);
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Payment on delivery");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let count = 1;
    const pay = () => {
        if (!user) {
            navigate("/login")
        }
        let money = 0
        for (let i = 0; i < cart?.cart.length; i++) {
            if (cart.cart[i] !== "") {
                const item = cart.cart[i].productprice;
                const spl1 = item.split(" ")[0]
                const spl2 = spl1.split(".")[0]
                money = parseInt(money) + parseInt(spl2)
            }
        }
        return parseInt(money + 30) + ".000 vnđ"
    }
    const handlePayment = (e) => {
        e.preventDefault();
        const body = {
            username: user?.username,
            fullname: fullname,
            phone: phone,
            address: address,
            paymentMethod: paymentMethod,
            total: pay(),
            cart: cart?.cart
        }
        payment(user?.accessToken, body, dispatch, navigate);
    }
    return (
        <div className="container mt-4 mb-4">
            <div className="form-group payment">
                <form method="post">
                    <span>Check out</span><br />
                    <label htmlFor="i-Username">Username</label>
                    <input type="text" className="form-control" defaultValue={user?.username} name="username" id="i-Username" aria-describedby="helpId" disabled="true" />
                    <label htmlFor="i-fullname">Full name</label>
                    <input type="text" className="form-control" onChange={(e) => setFullname(e.target.value)} name="i-fullname" id="i-fullname" aria-describedby="helpId" />
                    <label htmlFor="i-phone">Phone</label>
                    <input type="text" className="form-control" onChange={(e) => setPhone(e.target.value)} defaultValue={user?.phone} name="i-phone" id="i-phone" aria-describedby="helpId" />
                    <label htmlFor="i-address">Address</label>
                    <input type="text" className="form-control" onChange={(e) => setAddress(e.target.value)} name="i-address" id="i-address" aria-describedby="helpId" />
                    <label htmlFor="i-method">Payment method</label>
                    <input type="text" className="form-control" defaultValue="
Payment on delivery" name="i-method" id="i-method" onChange={(e) => setPaymentMethod(e.target.value)} aria-describedby="helpId" disabled="true" />
                    {cart?.cart.map((value) => {
                        if (value !== "") {
                            return (
                                <div className='checkout mt-3'>
                                    <p>{count++}. {value.productname}</p>
                                    <img src={value.image} alt="" />
                                    <p className='ml-3'>: {value.productprice}</p>
                                </div>
                            )
                        }
                    })}

                    <div className='ml-2 mt-4'>Transport fee: 30.000 vnđ</div>
                    <div className='ml-2 mt-4 font-weight-bold'>Total: {pay()}</div>
                    <div className="btn btn-outline-danger outline mt-4" onClick={(e) => handlePayment(e)}>Payments</div>
                </form>
            </div>
        </div>
    );
}

export default Payment;