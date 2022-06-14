import axios from 'axios';
import { addProductFailed, addProductStart, addProductSuccess, deleteProductFailed, deleteProductStart, deleteProductSuccess, deleteUserFailed, deleteUserStart, deleteUserSuccess, getOrdersFailed, getOrdersStart, getOrdersSuccess, getUserFailed, getUserStart, getUserSuccess, updateOrderFailed, updateOrderStart, updateOrderSuccess, updateProductFailed, updateProductStart, updateProductSuccess } from './adminSlice';

export const addProduct = async (accessToken, body, dispatch, navigate) => {
    dispatch(addProductStart());
    try {
        const res = await axios.post("http://localhost:8081/admin/addproduct", body, {
            headers: {
                token: "Bearer " + accessToken
            }
        })
        alert("add product successfully")
        dispatch(addProductSuccess(res.data));
        navigate("/admin")
    } catch (error) {
        dispatch(addProductFailed())
        alert("add product failed because: " + error.response.data.code)
    }
}

export const deleteProduct = async (accessToken, item, dispatch) => {
    dispatch(deleteProductStart());
    try {
        await axios.delete("http://localhost:8081/admin/deleteproduct/" + item._id, {
            headers: {
                token: "Bearer " + accessToken
            }
        })
        dispatch(deleteProductSuccess());
        alert("delete '" + item.productname + "' successfully")
    } catch (error) {
        dispatch(deleteProductFailed())
        alert("delete failed because: " + error.response.data)
    }
}

export const updateProduct = async (accessToken, id, dispatch, body) => {
    dispatch(updateProductStart());
    try {
        const res = await axios.patch("http://localhost:8081/admin/update/" + id, body, {
            headers: {
                token: "Bearer " + accessToken
            }
        })
        dispatch(updateProductSuccess(res.data))
        alert("update product: '" + body.productname + "' successfully")
    } catch (error) {
        dispatch(updateProductFailed())
        alert("delete failed because: " + error.response.data)
    }
}

export const getUser = async (accessToken, dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await axios.get("http://localhost:8081/admin/getuser", {
            headers: {
                token: "Bearer " + accessToken
            }
        })
        dispatch(getUserSuccess(res.data))
    } catch (error) {
        dispatch(getUserFailed())
        alert("Failed: " + error.response.data);
    }
}

export const deleteUser = async (accessToken, dispatch, user) => {
    dispatch(deleteUserStart());
    try {
        await axios.delete("http://localhost:8081/admin/delete/" + user._id, {
            headers: {
                token: "Bearer " + accessToken
            }
        })
        dispatch(deleteUserSuccess())
        alert("Delete user: '" + user.username + "' successfully")
    } catch (error) {
        dispatch(deleteUserFailed())
        alert("Failed: " + error.response.data);
    }
}

export const getOrders = async (accessToken, dispatch) => {
    dispatch(getOrdersStart());
    try {
        const res = await axios.get("http://localhost:8081/admin/getorders", {
            headers: {
                token: "Bearer " + accessToken
            }
        })
        dispatch(getOrdersSuccess(res.data))
    } catch (error) {
        dispatch(getOrdersFailed())
        alert("Failed: " + error.response.data);
    }
}

export const updateOrder = async (accessToken, dispatch, id, body, navigate) => {
    dispatch(updateOrderStart());
    try {
        await axios.patch("http://localhost:8081/admin/setorders/" + id, body, {
            headers: {
                token: "Bearer " + accessToken
            }
        })
        dispatch(updateOrderSuccess());
        alert("Update successfully")
        navigate("/admin/getorders")
    } catch (error) {
        dispatch(updateOrderFailed());
        alert("Failed: " + error.response.data);
    }
}