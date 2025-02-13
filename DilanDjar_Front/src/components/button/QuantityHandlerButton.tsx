import {FC, useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import {useBasket} from "../../context/BasketContext";
import {PlantType} from "../../@types/PlantType";

const QuantityHandlerButton: FC<{plant : PlantType}> = ({plant}) => {
    const [quantity, setQuantity] = useState<number>(1);
    const {dispatch} = useBasket();

    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            payload: {id: plant.id, name: plant.name, price: plant.price, quantity},
        });
    };

    return (
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
            <TextField
                type="number"
                label="Quantité"
                variant="outlined"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                sx={{marginBottom: "10px", width: "100px",
                    '& .MuiInputBase-input': {color: 'white'}, // Texte saisi en blanc
                    '& .MuiInputLabel-root': {color: 'white'}, // Label en blanc
                    '& .MuiOutlinedInput-notchedOutline': {borderColor: 'white'} // Bordure blanche
                }}
            />
            <Button variant="contained" color="primary"
                    onClick={() => {
                        addToBasket();
                        alert(quantity ==1 ? "Article ajouté au panier !" : "Articles ajoutés au panier !")
                    }}>
                Ajouter au panier
            </Button>
        </Box>
    );
};

export default QuantityHandlerButton;
