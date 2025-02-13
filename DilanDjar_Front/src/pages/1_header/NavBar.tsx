import * as React from 'react';
import {FC} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Container} from "@mui/material";
import NavBarLogo from "../../components/header/NavBarLogo";
import NavBarMenu from "../../components/header/NavBarMenu";
import NavBarAvatar from "../../components/header/NavBarAvatar";


const NavBar: FC = () => {

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'center'}}>
                    <NavBarMenu/>
                    <NavBarLogo/>
                    <NavBarAvatar/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;