import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import MyAccount from '../components/MyAccount';
import Profile from '../components/MyAccount/Profile';
import Favorites from '../components/MyAccount/Favorites';
import Posts from '../components/MyAccount/Posts';
import Chat from '../components/MyAccount/Chat'
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
                    <Route path="/cuenta" element={<MyAccount />} >
                    <Route index element={<Profile />} />
                    <Route path='perfil' element={<Profile />} />
                    <Route path='favoritos' element={<Favorites />} />
                    <Route path='publicaciones' element={<Posts />} />
                    <Route path='chat' element={<Chat />} />
                </Route>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RouterDom;