import React, {useState} from 'react';
import './App.css';
import Router from "./routers/Router";
import {BrowserRouter} from "react-router";
import {BasketProvider} from "./context/BasketContext";
import {HelmetProvider} from "react-helmet-async";
import {AuthContext} from "./context/AuthContext";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [token, setToken] = useState("");

    return (
        <BrowserRouter>
            <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, token, setToken}}>
                <HelmetProvider>
                    <BasketProvider>
                        <Router/>
                    </BasketProvider>
                </HelmetProvider>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}

export default App;