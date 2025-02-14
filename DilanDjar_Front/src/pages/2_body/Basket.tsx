import {FC} from "react";
import {useBasket} from "../../context/BasketContext";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router";
import Page from "../../components/layout/Page";

const Basket: FC = () => {
    const {state, dispatch, checkout} = useBasket();
    const navigate = useNavigate()

    const handleQuantityChange = (id: number, quantity: number) => {
        if (quantity < 1) return;
        dispatch({type: "UPDATE_QUANTITY", payload: {id, quantity}});
    };

    const handleRemoveItem = (id: number) => {
        dispatch({type: "REMOVE_FROM_BASKET", payload: {id}});
    };

    const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Page>
            <Box sx={{padding: "5vh", color: "white"}}>
                <Typography variant="h3" gutterBottom>
                    Mon Panier
                </Typography>

                {state.items.length === 0 ? (
                    <>
                        <Typography variant="h6">Votre panier est vide.</Typography>
                        <img
                            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2lrb3Y0dG9hd3EwcmdkZms5eWlkaDloZ3dxazhhMmZ6bmJzNzE0cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7SF5scGB2AFrgsXP63/giphy.gif"
                            alt="sad pika"/>
                    </>
                ) : (
                    <>
                        <TableContainer component={Paper}>
                            <Table sx={{tableLayout: "fixed", width: "100%"}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Produit</TableCell>
                                        <TableCell>Prix</TableCell>
                                        <TableCell>Quantité</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {state.items.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Button onClick={() => navigate("../PlantDetails/" + item.id)}>
                                                    {item.name}
                                                </Button>
                                            </TableCell>
                                            <TableCell>{item.price.toFixed(2)} €</TableCell>
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                                    inputProps={{min: 1}}
                                                    sx={{width: "60px"}}
                                                />
                                            </TableCell>
                                            <TableCell>{(item.price * item.quantity).toFixed(2)} €</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                >
                                                    Supprimer
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "flex-end"}}>
                            <Typography variant="h5">
                                Total : {totalPrice.toFixed(2)} €
                            </Typography>
                            <Box sx={{display: "flex", flexDirection: "row", alignItems: "flex-end", gap: "50px"}}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => dispatch({type: "CLEAR_BASKET"})}
                                    sx={{marginTop: "10px"}}
                                >
                                    Vider le panier
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{marginTop: "20px"}}
                                    onClick={() => {checkout(3); alert("Commande passée !")}}
                                >
                                    Passer la commande
                                </Button>
                            </Box>

                        </Box>
                    </>
                )}
            </Box>
        </Page>
    );
};

export default Basket;
