import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        addProduct: {
            product: null,
            fetching: false,
            error: false,
            noti: ""
        },
        updateProduct: {
            getProduct: null,
            product: null,
            fetching: false,
            error: false,
            noti: ""
        },
        getUser: {
            data: null,
            fetching: false,
            error: false,
            noti: ""
        },
        deleteProduct: {
            fetching: false,
            error: false,
            noti: ""
        },
        deleteUser: {
            fetching: false,
            error: false,
            noti: ""
        },
        getOrders: {
            fetching: false,
            error: false,
            noti: "",
            data: null,
        },
        updateOrder: {
            getOrder: null,
            fetching: false,
            error: false,
            noti: "",
        }
    },
    reducers: {
        // add product
        addProductStart: (state) => {
            state.addProduct.fetching = true;
            state.addProduct.error = false;
            state.addProduct.noti = "loading..."
        },
        addProductSuccess: (state, action) => {
            state.addProduct.fetching = false;
            state.addProduct.error = false;
            state.addProduct.noti = "add product successfully";
            state.addProduct.product = action.payload;
        },
        addProductFailed: (state) => {
            state.addProduct.fetching = false;
            state.addProduct.error = true;
            state.addProduct.noti = "add product failed";
        },
        // delete product
        deleteProductStart: (state) => {
            state.deleteProduct.fetching = true;
            state.deleteProduct.error = false;
            state.deleteProduct.noti = "loading..."
        },
        deleteProductSuccess: (state) => {
            state.deleteProduct.fetching = false;
            state.deleteProduct.error = false;
            state.deleteProduct.noti = "delete product successfully";
        },
        deleteProductFailed: (state) => {
            state.deleteProduct.fetching = false;
            state.deleteProduct.error = true;
            state.deleteProduct.noti = "delete product failed";
        },
        // update product
        getProductUpdate: (state, action) => {
            state.updateProduct.getProduct = action.payload;
        },
        updateProductStart: (state) => {
            state.updateProduct.fetching = true;
            state.updateProduct.error = false;
            state.updateProduct.noti = "loading..."
        },
        updateProductSuccess: (state, action) => {
            state.updateProduct.fetching = false;
            state.updateProduct.error = false;
            state.updateProduct.product = action.payload;
            state.updateProduct.noti = "update product successfully";
        },
        updateProductFailed: (state) => {
            state.updateProduct.fetching = false;
            state.updateProduct.error = true;
            state.updateProduct.noti = "update product failed";
        },
        // get user
        getUserStart: (state) => {
            state.getUser.fetching = true;
            state.getUser.error = false;
            state.getUser.noti = "loading..."
        },
        getUserSuccess: (state, action) => {
            state.getUser.fetching = false;
            state.getUser.error = false;
            state.getUser.data = action.payload;
            state.getUser.noti = "getUser successfully";
        },
        getUserFailed: (state) => {
            state.getUser.fetching = false;
            state.getUser.error = true;
            state.getUser.noti = "getUser failed";
        },
        // delete user
        deleteUserStart: (state) => {
            state.deleteUser.fetching = true;
            state.deleteUser.error = false;
            state.deleteUser.noti = "loading..."
        },
        deleteUserSuccess: (state) => {
            state.deleteUser.fetching = false;
            state.deleteUser.error = false;
            state.deleteUser.noti = "deleteUser successfully";
        },
        deleteUserFailed: (state) => {
            state.deleteUser.fetching = false;
            state.deleteUser.error = true;
            state.deleteUser.noti = "deleteUser failed";
        },
        // get orders
        getOrdersStart: (state) => {
            state.getOrders.fetching = true;
            state.getOrders.error = false;
            state.getOrders.noti = "loading..."
        },
        getOrdersSuccess: (state, action) => {
            state.getOrders.fetching = false;
            state.getOrders.error = false;
            state.getOrders.data = action.payload;
            state.getOrders.noti = "getOrders successfully";
        },
        getOrdersFailed: (state) => {
            state.getOrders.fetching = false;
            state.getOrders.error = true;
            state.getOrders.noti = "getOrders failed"
        },
        //set order
        getOrderUpdate: (state, action) => {
            state.updateOrder.getOrder = action.payload
        },
        updateOrderStart: (state) => {
            state.updateOrder.fetching = true;
            state.updateOrder.error = false;
            state.updateOrder.noti = "loading..."
        },
        updateOrderSuccess: (state) => {
            state.updateOrder.fetching = false;
            state.updateOrder.error = false;
            state.updateOrder.noti = "updateOrder successfully"
        },
        updateOrderFailed: (state) => {
            state.updateOrder.fetching = false;
            state.updateOrder.error = true;
            state.updateOrder.noti = "updateOrder failure"
        },

    }
})
export const {
    addProductStart, addProductSuccess, addProductFailed,
    deleteProductStart, deleteProductSuccess, deleteProductFailed,
    getProductUpdate, updateProductStart, updateProductSuccess, updateProductFailed,
    getUserStart, getUserSuccess, getUserFailed,
    deleteUserStart, deleteUserSuccess, deleteUserFailed,
    getOrdersStart, getOrdersSuccess, getOrdersFailed,
    getOrderUpdate, updateOrderStart, updateOrderSuccess, updateOrderFailed
} = adminSlice.actions;
export default adminSlice.reducer