import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        getCart: {
            cart: null,
            fetching: false,
            error: false
        },
        delItemInCart: {
            fetching: false,
            status: false,
            msg: ''
        },
        payment: {
            fetching: false,
            error: false,
            order: null
        }
    },
    reducers: {
        getCartStart: (state) => {
            state.getCart.fetching = true
        },
        getCartSuccess: (state, action) => {
            state.getCart.fetching = false
            state.getCart.cart = action.payload
            state.getCart.error = false
        },
        getCartFailed: (state) => {
            state.getCart.fetching = false
            state.getCart.error = true
        },

        delItemStart: (state) => {
            state.delItemInCart.fetching = true
        },
        delItemSuccess: (state, action) => {
            state.delItemInCart.fetching = false
            state.delItemInCart.msg = action.payload
            state.delItemInCart.status = true
        },
        delItemFailed: (state, action) => {
            state.delItemInCart.fetching = false
            state.delItemInCart.msg = action.payload
            state.delItemInCart.status = false
        },
        paymentStart: (state) => {
            state.payment.fetching = true
            state.payment.error = false
        },
        paymentSuccessfully: (state, action) => {
            state.payment.fetching = false
            state.payment.order = action.payload
            state.payment.error = false
        },
        paymentFailed: (state) => {
            state.payment.fetching = false
            state.payment.error = true
        },
    }
})

export const { getCartStart, getCartFailed, getCartSuccess
    , delItemStart, delItemSuccess, delItemFailed,
    paymentStart, paymentSuccessfully, paymentFailed
} = cartSlice.actions;
export default cartSlice.reducer