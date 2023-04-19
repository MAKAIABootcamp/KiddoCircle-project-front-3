import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home/Home";
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


const RouterDom = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route path="/" element={<Home />} />
                    <Route path="ropa" element={<Clothes />} />
                    <Route path="juguetes" element={<Toys />} />
                    <Route path="articulos" element={<Items />} />
                    <Route path="cart-shooping" element={<CartShopping />} />
                    <Route path="cuenta/*" element={<MenuAccount />}>
                        <Route
                            path="*"
                            element={<Navigate to="perfil" replace />}
                        />
                        <Route path="perfil" element="" />
                        <Route path="favoritos" element="" />
                        <Route path="mis-publicaciones" element={<Posts />} />
                        <Route
                            path="mis-compras-donaciones"
                            element={<Buy />}
                        />
                        <Route path="mi-billetera" element={<Wallet />} />
                        <Route path="chat" element="" />
                    </Route>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RouterDom;