import React from 'react';
import './App.css';
import Router from "./routers/Router";
import {BrowserRouter} from "react-router";


function App() {
    return (
        <BrowserRouter>
            <Router/>
        </BrowserRouter>
    );
}

export default App;