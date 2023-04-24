import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home/Home";
import Profile from "../components/MyAccount/Profile/Profile";
import Clothes from "../components/Clothes/Clothes";
import NavBar from "../components/Navbar/NavBar";
import Toys from "../components/Toys/Toys";
import Items from "../components/Items/Items";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Buy from "../components/MyAccount/Buy/Buy";
import Wallet from "../components/MyAccount/Wallet/Wallet";
import MenuAccount from "../components/MyAccount/MenuAccount/MenuAccount";
import CartShopping from "../components/CartShopping/CartShopping";
import Posts from "../components/MyAccount/Posts/Posts";
import Posts2 from "../components/MyAccount/Posts/Posts2";
import EachProduct from "../components/each-product/EachProduct";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { getUserCollection } from "../services/filterCollection";
import { userRegister } from "../redux/actions/userActions";
import PrivateRoute from "./PrivateRoute";
import Favorites from "../components/MyAccount/Favorites/Favorites";

const RouterDom = () => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((store) => store.user);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       getUserCollection(user.uid)
  //         .then((response) => {
  //           dispatch(userRegister(response));
  //         })
  //         .catch((error) => {
  //           dispatch(userRegister({}));
  //         });
  //     } else {
  //       console.log("usuario no logueado");
  //     }
  //   });
  // }, []);

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<NavBar />}>
                  <Route path="/" element={<Home />} />
                  <Route
                      path="producto/:idProducto"
                      element={<EachProduct />}
                  />
                  <Route path="ropa" element={<Clothes />} />
                  <Route path="juguetes" element={<Toys />} />
                  <Route path="articulos" element={<Items />} />
                  <Route path="car-shopping" element={<CartShopping />} />
                  <Route element={<PrivateRoute isLogged={isLogged} />}>
                      <Route path="cuenta/*" element={<MenuAccount />}>
                          <Route
                              path="*"
                              element={<Navigate to="perfil" replace />}
                          />
                          <Route path="perfil" element={<Profile />} />
                          <Route path="favoritos" element={<Favorites />} />
                          <Route
                              path="mis-publicaciones"
                              element={<Posts2 />}
                          />
                          <Route
                              path="mis-compras-donaciones"
                              element={<Buy />}
                          />
                          <Route path="mi-billetera" element={<Wallet />} />
                          <Route path="chat" element="" />
                      </Route>
                  </Route>
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
          </Routes>
      </BrowserRouter>
  );
};

export default RouterDom;
