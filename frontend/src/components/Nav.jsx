import React, { useEffect, useState } from 'react';
import './css/nav.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, getUser } from '../redux/apiAdminRequest';
import axios from 'axios';

function Nav(props) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch()
    const [data, setData] = useState(null);
    const [num, setNum] = useState(null)

    const display = () => {
        if (!user) {
            return <><Link to="/login">Sign-in / </Link>
                <Link to="/register">Register</Link></>
        } else {
            if (user?.admin) {
                return <>Welcome: <Link to="/admin" onClick={handleClick} className='mt-2'>{user.username}</Link></>
            }
            else return (<p className='mt-2'>Welcome: {user.username}</p>)
        }
    }
    const handleClick = () => {
        getUser(user?.accessToken, dispatch)
        getOrders(user?.accessToken, dispatch)
    }
    useEffect(() => {
        axios.get("http://localhost:8081/user/cart", {
            headers: {
                token: `Bearer ` + user?.accessToken,
                username: user?.username
            }
        }).then((res) => setData(res.data))
    }, [user])
    useEffect(() => {
        axios.get("http://localhost:8081/user/cart", {
            headers: {
                token: `Bearer ` + user?.accessToken,
                username: user?.username
            }
        }).then((res) => setData(res.data))
    }, [data])
    useEffect(() => {
        axios.get("http://localhost:8081/user/cart", {
            headers: {
                token: `Bearer ` + user?.accessToken,
                username: user?.username
            }
        }).then((res) => {
            let count = 0
            for (let i = 0; i < res.data.length; i++) {
                const item = res.data[i];
                if (item !== "") {
                    count++
                }
            }
            setNum(count)
        })
    }, [data])
    const small = () => {
        if (!data && !user) {
            return
        } else {
            let count = 0
            for (let i = 0; i < data?.length; i++) {
                const item = data[i];
                if (item !== "") {
                    count++
                }
            }
            return count
        }
    }
    const checkUser = () => {
        if (!user) {
            return "/login"
        } else {
            return "/cart"
        }
    }
    return (
        <div className="navbar navbar-expand-md navbar-light bg-light">
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse ml-4 mr-4" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item mr-3 active">
                        <Link className="nav-link" to="/">Bookstore<span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/novel">Novel</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/psychological">Psychological</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/literature">Literature</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/economic">Economic</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/science">Science</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/food">Food</Link>
                    </li>
                </ul>
                <div className="navbar-nav">
                    <div className="right">
                        <div className="user">
                            {display()}
                        </div>
                        <Link to={checkUser()}><img src="https://cdn.shopify.com/s/files/1/1241/4530/t/11/assets/muroexe_box_cart_300x.png?v=4097545061584136197" alt="cart" /></Link>
                        <small>{small()}</small>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Nav;