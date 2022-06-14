import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            fetching: false,
            error: false
        },
        register: {
            fetching: false,
            error: false
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.fetching = true
        },
        loginSuccess: (state, action) => {
            state.login.fetching = false
            state.login.currentUser = action.payload
            state.login.error = false
        },
        loginFailed: (state) => {
            state.login.fetching = false
            state.login.error = true
        },
        registerStart: (state) => {
            state.login.fetching = true
        },
        registerSuccess: (state) => {
            state.login.fetching = false
            state.login.error = false
        },
        registerFailed: (state) => {
            state.login.fetching = false
            state.login.error = true
        }
    }
})
export const { loginStart, loginFailed, loginSuccess,
    registerStart, registerFailed, registerSuccess,
} = authSlice.actions;
export default authSlice.reducer
