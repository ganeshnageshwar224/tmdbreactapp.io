import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieNavbar from './Components/movieNavbar/MovieNavbar';
import Home from './Components/home/Home'
import DetailsPage from './Components/detailsPage/DetailsPage';
import Login from './Components/login/Login';

function App() {
  const location = useLocation();

  // Hide navbar only on login page
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <MovieNavbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details-page/:type/:id" element={<DetailsPage />} />
      </Routes>
    </>
  );
}

export default App
