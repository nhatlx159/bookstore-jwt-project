import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import '../css/namepage.css';
import '../css/incart.css';
import { deleteUser } from '../../redux/apiAdminRequest';

function AllUser(props) {
    const [user, setUser] = useState(useSelector((state) => state.auth.login?.currentUser));
    const [data, setData] = useState(useSelector((state) => state.admin.getUser?.data));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user?.admin || !user) {
            navigate("/");
        }
    }, []);
    const display = (value) => {
        const handleDelete = (value) => {
            deleteUser(user?.accessToken, dispatch, value)
        }
        if (value.admin === true) {
            return (
                <i class="fa fa-check" aria-hidden="true"></i>
            )
        } else {
            return (
                <div className="btn btn-outline-danger" onClick={() => handleDelete(value)}>Remove</div>
            )
        }
    }
    const adminChecked = (value) => {
        if (value === true) {
            return <i class="fa fa-check" aria-hidden="true"></i>
        } else {
            return <i class="fa fa-times" aria-hidden="true"></i>
        }
    }
    return (
        <div>
            <h1 className="namepage">Admin - user manage</h1>
            <hr />
            <div className="cart">
                <div className="row row1">
                    <div className="col-3">User ID</div>
                    <div className="col-2">Username</div>
                    <div className="col-2">Phone</div>
                    <div className="col-2">Email</div>
                    <div className="col-1">Admin</div>
                    <div className="col-2">Manipulation</div>
                </div><hr />
            </div>
            <div className="cart">
                {
                    data ? data.map((value, key) => {
                        if (value !== "") {
                            return (
                                <div key={key} className="row row2 mt-3">
                                    <div className="col-3" >{value._id}</div>
                                    <div className="col-2">{value.username}</div>
                                    <div className="col-2">{value.phone}</div>
                                    <div className="col-2">{value.email}</div>
                                    <div className="col-1">{adminChecked(value.admin)}</div>
                                    <div className="col-2">
                                        <div className="btn-group">
                                            {display(value)}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }) : <h3>Loading...</h3>
                }</div>

        </div>
    );
}

export default AllUser;