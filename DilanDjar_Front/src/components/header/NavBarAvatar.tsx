import {FC} from 'react';
import {Avatar, IconButton} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";

const NavBarAvatar: FC<{}> = ({}) => {
    return (
            <Box sx={{flexGrow: 0}}>
                <IconButton sx={{p: 0}}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                </IconButton>
            </Box>
    );
};

export default NavBarAvatar;
