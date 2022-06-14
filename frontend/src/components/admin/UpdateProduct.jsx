import React, { useEffect, useState } from 'react';
import '../css/namepage.css';
import '../css/addproduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProduct } from '../../redux/apiAdminRequest';

function UpdateProduct(props) {
    window.scrollTo(0, 0);
    const [user, setUser] = useState(useSelector((state) => state.auth.login?.currentUser));
    const [product, setProduct] = useState(useSelector((state) => state.admin.updateProduct?.getProduct));
    const [productname, setProductname] = useState(product.productname);
    const [productprice, setProductprice] = useState(product.productprice);
    const [author, setAuthor] = useState(product.author);
    const [description, setDescription] = useState(product.description);
    const [quantily, setQuantily] = useState(product.quantily);
    const [classify, setClassify] = useState(product.classify);
    const [image, setImage] = useState(product.image);
    useEffect(() => {
        if (!user?.admin || !user) {
            navigate("/");
        }
    }, [])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = product._id;
        const body = {
            productname: productname,
            productprice: productprice,
            author: author,
            description: description,
            quantily: quantily,
            classify: classify,
            image: image
        }
        updateProduct(user?.accessToken, id, dispatch, body);
    }
    return (
        <div className="container">
            <h1 className="namepage">Admin - update product</h1>
            <hr />
            <div className="container mt-4 mb-4">
                <div className="form-group k1">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="productname">Product name</label>
                        <input type="text" defaultValue={product.productname} className="form-control" onChange={(e) => setProductname(e.target.value)} name="productname" id="productname" aria-describedby="helpId" />
                        <label htmlFor="productprice">Product price</label>
                        <input type="text" defaultValue={product.productprice} className="form-control" onChange={(e) => setProductprice(e.target.value)} name="productprice" id="productprice" aria-describedby="helpId" />
                        <label htmlFor="author">Author</label>
                        <input type="text" defaultValue={product.author} className="form-control" onChange={(e) => setAuthor(e.target.value)} name="author" id="author" aria-describedby="helpId" />
                        <label htmlFor="description">Description</label>
                        <input type="text" defaultValue={product.description} className="form-control" onChange={(e) => setDescription(e.target.value)} name="description" id="description" aria-describedby="helpId" />
                        <label htmlFor="quantily">Quantily</label>
                        <input type="text" defaultValue={product.quantily} className="form-control" onChange={(e) => setQuantily(e.target.value)} name="quantily" id="quantily" aria-describedby="helpId" />
                        <label htmlFor="classify">Classify</label>
                        <input type="text" defaultValue={product.classify} className="form-control" onChange={(e) => setClassify(e.target.value)} name="classify" id="classify" aria-describedby="helpId" />
                        <label htmlFor="image">Image URL</label>
                        <input type="text" defaultValue={product.image} className="form-control" onChange={(e) => setImage(e.target.value)} name="image" id="image" aria-describedby="helpId" />
                        <button type="submit" className="btn btn-outline-primary margin-auto mt-2">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;