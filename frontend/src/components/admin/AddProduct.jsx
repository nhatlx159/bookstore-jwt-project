import React, { useEffect, useState } from 'react';
import '../css/namepage.css';
import '../css/addproduct.css';
import { addProduct } from '../../redux/apiAdminRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddProduct(props) {
    const [user, setUser] = useState(useSelector((state)=> state.auth.login?.currentUser));
    const [productname, setProductname] = useState("");
    const [productprice, setProductprice] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [quantily, setQuantily] = useState("");
    const [classify, setClassify] = useState("");
    const [image, setImage] = useState("");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e)=> {
        e.preventDefault();
        const body = {
            productname: productname,
            productprice: productprice,
            author: author,
            description: description,
            quantily: quantily,
            classify: classify,
            image: image,
        }
        addProduct(user?.accessToken, body, dispatch, navigate)
    }
    useEffect(()=>{
        if(!user?.admin || !user){
            navigate("/");
        }
    }, [])
    return (
        <div className="container">
            <h1 className="namepage">Admin - add product</h1>
            <hr />
            <div className="container mt-4 mb-4">
            <div className="form-group k1">
                <form method="post" onSubmit={handleSubmit}>
                    <label htmlFor="productname">Product name</label>
                    <input type="text" className="form-control" onChange={(e)=> setProductname(e.target.value)} name="productname" id="productname" aria-describedby="helpId" />
                    <label htmlFor="productprice">Product price</label>
                    <input type="text" className="form-control" onChange={(e)=> setProductprice(e.target.value)} name="productprice" id="productprice" aria-describedby="helpId" />
                    <label htmlFor="author">Author</label>
                    <input type="text" className="form-control" onChange={(e)=> setAuthor(e.target.value)} name="author" id="author" aria-describedby="helpId" />
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" onChange={(e)=> setDescription(e.target.value)} name="description" id="description" aria-describedby="helpId" />
                    <label htmlFor="quantily">Quantily</label>
                    <input type="text" className="form-control" onChange={(e)=> setQuantily(e.target.value)} name="quantily" id="quantily" aria-describedby="helpId" />
                    <label htmlFor="classify">Classify</label>
                    <input type="text" className="form-control" onChange={(e)=> setClassify(e.target.value)} name="classify" id="classify" aria-describedby="helpId" />
                    <label htmlFor="image">Image URL</label>
                    <input type="text" className="form-control" onChange={(e)=> setImage(e.target.value)} name="image" id="image" aria-describedby="helpId" />
                    <button type="submit" className="btn btn-outline-primary margin-auto mt-2">Add</button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default AddProduct;