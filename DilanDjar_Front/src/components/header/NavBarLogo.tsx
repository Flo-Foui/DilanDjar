import * as React from 'react';
import {FC} from 'react';
import Typography from "@mui/material/Typography";

const NavBarLogo: FC<{}> = ({}) => {

    return (
        <>
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                    mr: 2,
                    display: {xs: 'none', md: 'flex'},
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    order: '-1'
                }}
            >
                DilanDjar
            </Typography>
            <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                    mr: 2,
                    display: {xs: 'flex', md: 'none'},
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                DilanDjar
            </Typography>
        </>
    );
};

export default NavBarLogo;
