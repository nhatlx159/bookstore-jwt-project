import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import '../css/namepage.css';

function Admin(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState(useSelector((state) => state.auth.login?.currentUser));
    useEffect(() => {
        if (!user?.admin || !user) {
            navigate("/");
        }
    }, [])
    return (
        <div className="container">
            {
                user?.admin ?
                    <div>
                        <h1 className="namepage">Admin</h1>
                        <hr />
                        <p>Product: </p>
                        <div className="btn-group">
                            <Link className='btn btn-outline-info' to="/admin/addproduct">Add Product</Link>
                            <Link className='btn btn-outline-secondary' to="/admin/editproduct">Edit Product</Link>
                        </div>
                        <p>User: </p>
                        <Link className='btn btn-outline-info' to="/admin/alluser">Edit user</Link>
                        <p>Orders: </p>
                        <Link className='btn btn-outline-info' to="/admin/getorders">Check orders</Link>
                    </div> : <Link to="/">Back to home</Link>
            }
        </div>
    );
}

export default Admin;