import {FC, useContext} from 'react';
import {Navigate, Route, Routes} from 'react-router';
import Dashboard from "../pages/2_body/Dashboard";
import Basket from "../pages/2_body/Basket";
import PlantDetails from "../pages/2_body/PlantDetails";
import Search from "../pages/2_body/Search";
import LayoutWithBar from "../layout/LayoutWithBar";
import LayoutWithoutBar from "../layout/LayoutWithoutBar";
import Login from "../pages/2_body/Login";
import Error from "../pages/2_body/Error";
import {AuthContext} from "../context/AuthContext";
import Register from "../pages/2_body/Register";
import Admin from "../pages/2_body/Admin";


const Router: FC<{}> = ({}) => {
    const authContext = useContext(AuthContext)

    return (
        <Routes> {
            authContext?.isLoggedIn ? (
                <>
                    <Route element={<LayoutWithBar/>}>
                        <Route path={"/Dashboard"} element={<Dashboard/>}/>
                        <Route path={"/PlantDetails/:id"} element={<PlantDetails/>}/>
                        <Route path={"/Basket"} element={<Basket/>}/>
                        <Route path={"/Search"} element={<Search/>}/>
                        <Route path={"/Admin"} element={<Admin/>}/>
                        <Route path={"/"} element={<Navigate to="/Dashboard" replace/>}/>
                    </Route>
                    <Route element={<LayoutWithoutBar/>}>
                        <Route path="Error" element={<Error/>}/>
                    </Route>
                </>
            ) : (
                <Route element={<LayoutWithoutBar/>}>
                    <Route path={"Login"} element={<Login/>}/>
                    <Route path={"Register"} element={<Register/>}/>
                    <Route path="*" element={<Navigate to="/Login" replace/>}/>
                </Route>
            )
        }
        </Routes>
    );
};

export default Router;
