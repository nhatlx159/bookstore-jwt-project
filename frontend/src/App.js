import { Routes, Route } from "react-router-dom";
import Nav from './components/Nav.jsx';
import Login from './components/Login';
import Register from './components/Register';
import Home from "./components/Home.jsx";
import Cart from "./components/Cart.jsx";
import Details from "./components/Details.jsx";
import Novel from "./components/navbarRouter/Novel.jsx";
import Psychological from "./components/navbarRouter/Psychological.jsx";
import Literature from "./components/navbarRouter/Literature.jsx";
import Economic from "./components/navbarRouter/Economic.jsx";
import Science from "./components/navbarRouter/Science.jsx";
import Food from "./components/navbarRouter/Food.jsx";
import Payment from "./components/Payment.jsx";
import OrderDetails from "./components/OrderDetails.jsx";
import Admin from "./components/admin/Admin.jsx";
import AddProduct from "./components/admin/AddProduct.jsx";
import DeleteProduct from "./components/admin/DeleteProduct.jsx";
import UpdateProduct from "./components/admin/UpdateProduct.jsx";
import AllUser from "./components/admin/AllUser.jsx";
import AllOrder from "./components/admin/AllOrder.jsx";
import SetOrder from "./components/admin/SetOrder.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "./redux/apiRequest.js";

function App() {
  window.scrollTo(0, 0);
  const [user, setUser] = useState(useSelector((state) => state.auth.login?.currentUser))
  const dispatch = useDispatch()
  useEffect(() => {
    getCart(user?.accessToken, user?.username, dispatch)
  }, [])
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/details" element={<Details />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/novel" element={<Novel />}></Route>
        <Route path="/psychological" element={<Psychological />}></Route>
        <Route path="/literature" element={<Literature />}></Route>
        <Route path="/economic" element={<Economic />}></Route>
        <Route path="/science" element={<Science />}></Route>
        <Route path="/food" element={<Food />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/oddetails" element={<OrderDetails />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/addproduct" element={<AddProduct />}></Route>
        <Route path="/admin/editproduct" element={<DeleteProduct />}></Route>
        <Route path="/admin/updateproduct" element={<UpdateProduct />}></Route>
        <Route path="/admin/alluser" element={<AllUser />}></Route>
        <Route path="/admin/getorders" element={<AllOrder />}></Route>
        <Route path="/admin/setorder" element={<SetOrder />}></Route>
      </Routes>
      {/* <Footer/> */}
    </div>

  );
}

export default App;
