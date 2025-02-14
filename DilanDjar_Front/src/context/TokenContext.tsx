import {createContext} from "react";

export const TokenContext = createContext<TokenContextProps | undefined>(undefined);

interface TokenContextProps {
    is: String;
    setIsLoggedIn: any;
}