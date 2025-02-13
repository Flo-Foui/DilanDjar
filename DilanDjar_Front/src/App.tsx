import React from 'react';
import './App.css';
import Router from "./routers/Router";
import {BrowserRouter} from "react-router";
import {BasketProvider} from "./context/BasketContext";
import {HelmetProvider} from "react-helmet-async";


function App() {
    return (
                <BrowserRouter>
        <HelmetProvider>
            <BasketProvider>
                    <Router/>
            </BasketProvider>
        </HelmetProvider>
                </BrowserRouter>
    );
}

export default App;