import { useState,useEffect } from "react";import React from "react";
import { Link,Outlet,Route,Routes } from "react-router-dom";
import Recommendation from "./recommendation.jsx";
import Sheets from "./sheets.jsx";
import Search from "./search.jsx";
import "./home.css";


const Home=()=>{
    return(
        <>
        <div id="home-container">
            <div id="recommend-search-sec">
            <Recommendation/>
            <Search/>
            </div>
            <Sheets/>
        </div>
        </>
    );
};

export default Home;