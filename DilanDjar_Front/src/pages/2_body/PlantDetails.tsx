import {FC, useEffect, useState} from "react";
import {useParams} from "react-router";
import {get} from "../../api/api";
import {Box} from "@mui/material";
import PlantPoster from "../../components/plantDetails/PlantPoster";
import PlantInfos from "../../components/plantDetails/PlantInfos";
import QuantityHandlerButton from "../../components/button/QuantityHandlerButton";
import Page from "../../components/layout/Page";

const PlantDetails: FC = () => {
    const [plant, setPlant] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const {id} = useParams();

    const fetchPlantDetails = async () => {
        setLoading(true);
        const plantResponse = await get(`http://localhost:8080/products/${id}`);
        if (plantResponse) {
            setPlant(plantResponse);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPlantDetails();
    }, []);
    if (loading) {
        return <p>Chargement...</p>;
    }
    if (!plant) {
        return <p>Plante non trouvée...</p>;
    }

    return (
        <Page>
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", gap: "20px", padding: "5vh"}}>
                <PlantPoster plant={plant}/>
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", gap: "50px"}}>
                    <PlantInfos plant={plant}/>
                    <QuantityHandlerButton plant={plant}/>
                </Box>
            </Box>
        </Page>
    );
};

export default PlantDetails;
