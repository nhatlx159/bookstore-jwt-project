import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/apiRequest';
import '../ui/css/section.css';

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            username: username,
            password: password
        }
        loginUser(user, dispatch, navigate)
    }
    return (
        <div className="container mt-4 mb-4">
            <div className="form-group">
                <form method="post" onSubmit={handleSubmit}>
                    <span>Login</span><br />
                    <label htmlFor="i-Username">Username</label>
                    <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} name="username" id="i-Username" aria-describedby="helpId" />
                    <label htmlFor="i-Password">Password</label>
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} name="password" id="i-Password" aria-describedby="helpId" />
                    <small className="d-block mt-2 float-right">Not have a account? <Link to="/register">Register here!!</Link></small>
                    <button type="submit" className="btn btn-outline-primary">Sign in</button>
                </form>
            </div>
        </div>

    );
}

export default Login;