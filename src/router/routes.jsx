import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Clothes from "../components/Clothes/Clothes";
import NavBar from "../components/Navbar/NavBar";
import Toys from "../components/Toys/Toys";
import Items from "../components/Items/Items";

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
            </Routes>
        </BrowserRouter>
    );
}

export default RouterDom;