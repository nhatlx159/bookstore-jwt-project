import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: [],
        fetching: false,
        error: false,
        getDetails: {
            fetching: false,
            id: '',
            error: false
        },
        productInDetails: [],
        addToCart: {
            fetching: false,
            product: {},
            error: false
        }
    }
    ,
    reducers: {
        getProductStart: (state) => {
            state.fetching = true
            state.error = false
        },
        getProductSuccessfully: (state, action) => {
            state.fetching = false
            state.product = action.payload
            state.error = false
        },
        getProductFailed: (state) => {
            state.fetching = false
            state.error = true
        },
        getIdSuccessfully: (state, action) => {
            state.getDetails.fetching = false
            state.productInDetails = action.payload
            state.getDetails.error = false
        },
        addToCartStart: (state) => {
            state.addToCart.fetching = true
        },
        addToCartSuccessfully: (state, action) => {
            state.addToCart.fetching = false
            state.addToCart.product = action.payload
            state.addToCart.error = false

        },
        addToCartFailed: (state) => {
            state.addToCart.fetching = false
            state.addToCart.error = true
        },
    }
})

export const { getProductStart, getProductFailed, getProductSuccessfully
    , getIdSuccessfully, addToCartStart, addToCartFailed, addToCartSuccessfully } = productSlice.actions;
export default productSlice.reducer