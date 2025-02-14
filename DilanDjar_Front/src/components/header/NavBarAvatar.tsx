import {FC, useContext} from 'react';
import {Avatar, Divider, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const NavBarAvatar: FC<{}> = ({}) => {
    const authContext = useContext(AuthContext);

    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{width: 'auto', display: "flex", justifyContent: "flex-end", padding: "0 50px 0 20px"}}>
            <IconButton onClick={handleOpenUserMenu} sx={{padding: 0}}>
                <Avatar src=""/>
            </IconButton>
            <Menu
                sx={{
                    mt: '45px',

                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem key={"Déconnexion"} onClick={() =>
                    authContext?.setIsLoggedIn(false)
                }>
                    <Typography color="primary" textAlign="center">{"Déconnexion"}</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default NavBarAvatar;