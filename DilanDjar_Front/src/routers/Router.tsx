import {FC} from 'react';
import {Navigate, Route, Routes} from 'react-router';
import Dashboard from "../pages/2_body/Dashboard";
import Basket from "../pages/2_body/Basket";
import PlantDetails from "../pages/2_body/PlantDetails";
import Search from "../pages/2_body/Search";
import LayoutWithBar from "../layout/LayoutWithBar";
import LayoutWithoutBar from "../layout/LayoutWithoutBar";
import Login from "../pages/2_body/Login";


const Router: FC<{}> = ({}) => {
    return (
        <>
            <Routes>
                <Route element={<LayoutWithBar/>}>
                    <Route path={"/"} element={<Navigate to={"/Dashboard"} replace/>}/>
                    <Route path={"Dashboard"} element={<Dashboard/>}/>
                    <Route path={"PlantDetails/:id"} element={<PlantDetails/>}/>
                    <Route path={"Basket"} element={<Basket/>}/>
                    <Route path={"Search"} element={<Search/>}/>
                </Route>
                <Route element={<LayoutWithoutBar/>}>
                    <Route path={"Login"} element={<Login/>}/>
                </Route>
            </Routes>
        </>
    );
};

export default Router;
