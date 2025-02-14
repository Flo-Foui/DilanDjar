import React, {FC} from 'react';
import CardMedia from "@mui/material/CardMedia";
import {PlantType} from "../../@types/PlantType";

const PlantPoster: FC<{ plant: PlantType }> = ({plant}) => {
    return (
        <CardMedia
            component="img"
            image={
                plant.poster_path ?
                    "https://image.tmdb.org/t/p/original/" + plant.poster_path
                    :
                    "https://placehold.co/100x150?text=No\nImage"
            }
            alt={plant.name}
            sx={{
                width: "17%", height:
                    "fit-content", margin:
                    "auto 0px"
            }}
        />
    )
        ;
};

export default PlantPoster;
