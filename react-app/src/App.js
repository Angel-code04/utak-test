
import {useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { UserProvider } from "./UserContext";

import AppNavbar from './components/AppNavbar';

// import AdminDash from "./pages/AdminDash";
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from "./pages/Logout";
import Profile from './pages/Profile';
import Register from './pages/Register';

import "bootswatch/dist/minty/bootstrap.min.css";
import {Container} from "react-bootstrap";


import './App.css';



function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  const unsetUser = () => {
    localStorage.clear()
  };

  useEffect(() => {

  }, [user])


  useEffect( () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`

        }
    })
    .then(res => res.json())
    .then(data => {
        if(typeof data._id !== "undefined" && typeof data.isAdmin){
          setUser({

            id: data._id,
            isAdmin: data.isAdmin
          })
        }
        else{
          setUser({
            id: null,
            isAdmin: null
          })
        }
        
    })
  }, [])

  return (

    <UserProvider value={{user, setUser, unsetUser}}>

      <Router> 
      <AppNavbar />
      <Container fluid>
        <Routes>

          <Route exact path = "/" element={<Home />} />
          {/* <Route exact path = "/admin" element={<AdminDash />} />
          <Route exact path = "/create" element={<CreateProduct />} />
          <Route exact path = "/showOrders" element={<ShowOrders />} />

          <Route exact path = "/products" element={<Products />} />
          <Route exact path = '/cart' element={<Cart />} />
          <Route exact path = '/placeOrder' element={<PlaceOrder />} />
          <Route exact path = '/orders' element={<Orders />} />
          <Route exact path = "/products/:productId" element={<ProductView />} /> */}
          <Route exact path = "/register" element={<Register />} />
          <Route exact path = "/profile" element={<Profile />} />
          <Route exact path = "/login" element={<Login />} />
          <Route exact path = "/logout" element={<Logout />} />



        </Routes>
      </Container>
    </Router>
    </UserProvider>

  );
}

export default App;