import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Clothes from "../components/Clothes/Clothes";
import NavBar from "../components/Navbar/NavBar";
import Toys from "../components/Toys/Toys";
import Items from "../components/Items/Items";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

const RouterDom = () => { 
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/ropa" element={<Clothes />} />
                    <Route path="/juguetes" element={<Toys />} />
                    <Route path="/articulos" element={<Items />} />
                    <Route path="/mi-cuenta" element="" />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RouterDom;