import {FC} from 'react';
import {Outlet} from "react-router";
import NavBar from "../pages/1_header/NavBar";

const LayoutWithBar: FC<{}> = ({}) => {
    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    )
        ;
};

export default LayoutWithBar;
