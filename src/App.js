import React from "react";
import "./App.css";
import Dictionary from "./Dictionary";
import Navbar from "./components/Navbar";


export default function App(){
    return(
        <div className="app">
            <Navbar/>
            <Dictionary/>
        </div>
    );
}