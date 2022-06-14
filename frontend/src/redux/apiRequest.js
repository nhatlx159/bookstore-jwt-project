import axios from 'axios';
import {
    loginFailed, loginStart, loginSuccess,
    registerStart, registerFailed, registerSuccess
}
    from './authSlice';
import { delItemFailed, delItemStart, delItemSuccess, getCartFailed, getCartStart, getCartSuccess, paymentFailed, paymentStart, paymentSuccessfully } from './cartSlice';
import {
    addToCartFailed, addToCartStart, addToCartSuccessfully,
    getProductFailed, getProductStart, getProductSuccessfully
} from './productSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post("http://localhost:8081/v1/login", user)
        dispatch(loginSuccess(res.data))
        navigate("/")
    } catch (err) {
        dispatch(loginFailed())
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        await axios.post("http://localhost:8081/v1/register", user)
        dispatch(registerSuccess())
        navigate("/login")
    } catch (err) {
        dispatch(registerFailed())
    }
}

export const getProduct = async (dispatch) => {
    dispatch(getProductStart())
    try {
        const res = await axios.get("http://localhost:8081")
        dispatch(getProductSuccessfully(res.data))
    } catch (err) {
        dispatch(getProductFailed())
    }
}

export const addToCart = async (accessToken, username, id, dispatch, navigate) => {
    dispatch(addToCartStart())
    try {
        const res = await axios.post("http://localhost:8081/user/addtocart/" + id, {}, {
            headers: {
                token: 'Bearer ' + accessToken,
                username: username,
                'content-type': 'text/json'
            }
        })
        dispatch(addToCartSuccessfully(res.data))
    } catch (error) {
        dispatch(addToCartFailed())
        navigate("/login")
    }
}

export const getCart = async (accessToken, username, dispatch) => {
    dispatch(getCartStart())
    try {
        const res = await axios.get("http://localhost:8081/user/cart", {
            headers: {
                token: `Bearer ` + accessToken,
                username: username
            }
        })
        dispatch(getCartSuccess(res.data))
    } catch (error) {
        dispatch(getCartFailed())
    }
}

export const delItem = async (accessToken, id, dispatch, username) => {
    dispatch(delItemStart())
    try {
        await axios.delete('http://localhost:8081/user/remove/' + id, {
            headers: {
                token: 'Bearer ' + accessToken,
                username: username
            }
        })
        dispatch(delItemSuccess('Delete item ' + id + ' successfully'))
    } catch (error) {
        dispatch(delItemFailed('Failed'))
    }
}
export const payment = async (accessToken, body, dispatch, navigate) => {
    dispatch(paymentStart())
    try {
        const res = await axios.post("http://localhost:8081/user/payment", body, {
            headers: {
                token: "Bearer " + accessToken
            }
        })
        dispatch(paymentSuccessfully(res.data))
        navigate("/")
    } catch (error) {
        dispatch(paymentFailed())
    }
}