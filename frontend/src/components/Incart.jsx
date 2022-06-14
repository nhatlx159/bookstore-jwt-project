import React, { useEffect, useState } from 'react';
import './css/incart.css';
import { useDispatch, useSelector } from 'react-redux';
import { delItem, getCart } from '../redux/apiRequest';

function Incart(props) {
    const dispatch = useDispatch()
    const [user, setUser] = useState(useSelector((state) => state.auth.login?.currentUser))
    let i = 1;
    useEffect(() => {
        getCart(user?.accessToken, user?.username, dispatch)
    }, [])
    const handleClick = (value) => {
        console.log(user?.accessToken, value._id);
        delItem(user?.accessToken, value._id, dispatch, user?.username)
    }
    return (
        <div className="cart">
            {
                props.data?.map((value, key) => {
                    if (value !== "") {
                        return (
                            <div key={key} className="row row2 mt-3">
                                <div className="col-1" >{i++}</div>
                                <div className="col-3"><img src={value.image} alt="" /></div>
                                <div className="col-3">{value.productname}</div>
                                <div className="col-2">{value.productprice}</div>
                                <div className="col-3"><div className="btn btn-danger" onClick={() => handleClick(value)}>Remove</div></div>
                            </div>
                        )
                    }
                })}
        </div>

    );
}
// dunghtan090965@gmail.com

export default Incart;

