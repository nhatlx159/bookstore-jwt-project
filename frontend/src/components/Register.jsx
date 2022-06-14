import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/apiRequest';
import '../ui/css/section.css';

function Register(props) {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            username: username,
            phone: phone,
            email: email,
            password: password
        }
        registerUser(user, dispatch, navigate)
    }
    return (
        <div className="container mt-4 mb-4">
            <div className="form-group">
                <form method="post" onSubmit={handleSubmit}>
                    <span>Register</span><br />
                    <label htmlFor="i-Username">Username</label>
                    <input type="text" className="form-control" name="username" onChange={(e) => setUsername(e.target.value)} id="i-Username" aria-describedby="helpId" />
                    <label htmlFor="i-Phone">Phone</label>
                    <input type="text" className="form-control" name="phone" onChange={(e) => setPhone(e.target.value)} id="i-Phone" aria-describedby="helpId" />
                    <label htmlFor="i-Email">Email</label>
                    <input type="text" className="form-control" name="email" onChange={(e) => setEmail(e.target.value)} id="i-Email" aria-describedby="helpId" />
                    <label htmlFor="i-Password">Password</label>
                    <input type="password" className="form-control" name="password" onChange={(e) => setPassword(e.target.value)} id="i-Password" aria-describedby="helpId" />
                    <small className="d-block mt-2 float-right">Have a account? <Link to="/login">Login here!!</Link></small>
                    <button type="submit" className="btn btn-outline-primary">Create</button>
                </form>
            </div>
        </div>

    );
}

export default Register;