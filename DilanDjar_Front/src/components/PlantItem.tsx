import {FC} from 'react';
import {useNavigate} from "react-router";
import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {PlantType} from "../@types/PlantType";

const PlantItem: FC<{plant: PlantType}> = ({plant}) => {

    const navigate = useNavigate();
    
    return(
        <Box sx={{
            height: 430, width: 200, margin: "15px 10px",
            transition: "transform 0.3s ease-in-out", "&:hover": {transform: "scale(1.1)"}
        }}>
            <Button onClick={() => navigate("../PlantDetails/" + plant.id)}>
                <Card>
                    <CardMedia sx={{height: 306, width: 200}}
                               component="img"
                               image={plant.poster_path ?
                                   "https://image.tmdb.org/t/p/original/" + plant.poster_path
                                   :
                                   "https://placehold.co/100x150?text=No\nImage"}
                               alt={plant.name}
                    />
                    <CardContent sx={{
                        padding: "10px !important",
                        height: 100,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        backgroundColor: "lightgray"

                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            overflow: "hidden",
                        }}>
                            <Typography variant="h6" component="div" title={plant.name} sx={{
                                fontSize: 17,
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                                lineClamp: 2,
                                overflow: 'hidden',
                                textOverflow: "ellipsis",
                            }}>
                                {plant.name}
                            </Typography>
                        </Box>
                        <Typography variant="body2" component="div" sx={{fontSize: 17, textAlign: "end"}}>
                            {plant.price} €
                        </Typography>
                    </CardContent>
                </Card>
            </Button>
        </Box>
    );
};

export default PlantItem;