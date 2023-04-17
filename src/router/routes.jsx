import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import Clothes from "../components/Clothes/Clothes";

const RouterDom = () => { 
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ropa" element={<Clothes />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RouterDom;