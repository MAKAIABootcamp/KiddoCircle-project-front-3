import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import MyAccount from '../components/MyAccount';
import Profile from '../components/MyAccount/Profile';
import Favorites from '../components/MyAccount/Favorites';
import Posts from '../components/MyAccount/Posts';
import Chat from '../components/MyAccount/Chat'


const RouterDom = () => { 
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                
                <Route path='/mi-cuenta/' element={<MyAccount />}>
          <Route index element={<Profile />} />
          <Route path='perfil' element={<Profile />} />
          <Route path='favoritos' element={<Favorites />} />
          <Route path='publicaciones' element={<Posts />} />
          <Route path='chat' element={<Chat />} />
        </Route>
        </Routes>
        </BrowserRouter>
    );
}

export default RouterDom;