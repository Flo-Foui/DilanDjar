import {FC} from 'react';
import {Button, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import * as React from "react";
import {useNavigate} from "react-router";

const pages = [
    {name: "Accueil", path: "../Dashboard"},
    {name: "Recherche", path: "../Search"},
    {name: "Panier", path: "../Basket"},
    {name: "Admin", path: "../Admin"}

];

const NavBarMenu: FC<{}> = ({}) => {

    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{display: {xs: 'block', md: 'none'}}}
                >
                    {pages.map((page) => (
                        <MenuItem key={page.name} onClick={() => {
                            handleCloseNavMenu();
                            navigate(page.path)
                        }}>
                            <Typography sx={{textAlign: 'center'}}>{page.name}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                {pages.map((page) => (
                    <Button
                        key={page.name}
                        onClick={() => {
                            handleCloseNavMenu();
                            navigate(page.path)
                        }}
                        sx={{my: 2, color: 'white', display: 'block'}}
                    >
                        {page.name}
                    </Button>
                ))}
            </Box>
        </>
    );
};

export default NavBarMenu;
