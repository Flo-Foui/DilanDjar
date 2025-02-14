import * as React from 'react';
import {FC} from 'react';
import {Box} from "@mui/material";
import {Helmet} from "react-helmet-async";

const Page: FC<{ children: any}> = ({children}) => {
    return (
        <Box>
            <Helmet>
                <title>DilanDjar</title>
                <link rel="icon" href="monstera.png" type="image/x-icon"/>
            </Helmet>
            {children}
        </Box>

    );
};

export default Page;
