import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProduct } from '../redux/apiRequest';
import './css/namepage.css';
import './css/processing.css'
import Product from './Product';

function Home(props) {
    window.scrollTo(0, 0);
    const [data, setData] = useState(null)
    useEffect(() => {
        fetch("http://localhost:8081").then((res) => res.json())
            .then((json) => setData(json))
    }, [])
    const display = () => {
        if (!data) {
            return (
                <div class="lds-hourglass"></div>
            )
        }
        return <Product data={data} />
    }
    const dispatch = useDispatch()
    getProduct(dispatch)
    return (
        <div className="container">
            <h1 className="namepage">Bookstore</h1>
            <hr />
            <h3 className="classify">All product</h3>
            <div className="row mt-4 mb-4">
                {display()}
            </div>
        </div>
    );
}

export default Home;