import React, {FC, useEffect, useState, useTransition} from 'react';
import {get} from "../../api/api";
import Box from "@mui/material/Box";
import PlantItem from "../../components/PlantItem";
import {PlantType} from "../../@types/PlantType";

const Dashboard: FC<{}> = ({}) => {
    const [plantCollection, setPlantCollection] = useState<PlantType[] | undefined>(undefined)
    const [isPending, startTransition] = useTransition()

    const hydrate = () => {
        // @ts-ignore
        startTransition(async () => {
            const results = await get(`http://localhost:8080/products`)
            startTransition(() => {
                setPlantCollection(results)
            })
        });
    }
    useEffect(() => {
        hydrate();
    },[]);

    return (
        <>
            Dash
            {!isPending && plantCollection &&
                //<Pages>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        padding: "10px 15px",
                    }}>
                        {plantCollection.map((plant) => (
                            <PlantItem plant={plant}/>
                        ))}
                    </Box>
                //</Pages>
            }
        </>
    );
};

export default Dashboard;