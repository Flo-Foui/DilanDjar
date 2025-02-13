import {FC} from 'react';
import {Box, Typography} from "@mui/material";
import {PlantType} from "../../@types/PlantType";

const PlantInfos: FC<{plant: PlantType}> = ({plant}) => {
    return (
        <Box sx={{width: "60%", display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
            <Typography gutterBottom variant="h3" component="div" color="white">
                {plant.name}
            </Typography>
            <Typography gutterBottom variant="h4" component="div" color="white">
                {plant.price} €
            </Typography>
            <Typography gutterBottom variant="body1" component="p" color="white">
                {plant.description ? plant.description : "Description non disponible"}
            </Typography>
        </Box>
    );
};

export default PlantInfos;
