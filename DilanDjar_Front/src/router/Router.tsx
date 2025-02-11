import {FC} from 'react';
import {Navigate, Route, Routes} from 'react-router';
import Dashboard from "../pages/2_body/Dashboard";
import Basket from "../pages/2_body/Basket";
import PlantsDetails from "../pages/2_body/PlantsDetails";
import Search from "../pages/2_body/Search";


const Router: FC<{}> = ({}) => {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Navigate to={"/Dashboard"} replace/>}/>
                <Route path={"Dashboard"} element={<Dashboard/>}/>
                <Route path={"PlantsDetails"} element={<PlantsDetails/>}/>
                <Route path={"Basket"} element={<Basket/>}/>
                <Route path={"Search"} element={<Search/>}/>
            </Routes>
        </>
    );
};

export default Router;
