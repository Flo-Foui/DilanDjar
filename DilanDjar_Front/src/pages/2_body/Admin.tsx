import {useState} from "react";
import {TextField, Button, Card, Box, Typography, Stack} from "@mui/material";
import {get, post} from "../../api/api";


const Admin = () => {
    const [email, setEmail] = useState("");
    const [order, setOrder] = useState<any | null>(null);

    const handleSearchOrderByEmail = async () => {
        try {
            const response = await get(`http://localhost:8080/orders/${email}`);
            setOrder(response);
            console.log("order", order)
        } catch (error) {
            console.error("Erreur lors de la recherche de commande :", error);
        }
    };

    return (
        <Box sx={{p: 3, display: "flex", flexDirection: "column", gap: 4, maxWidth: 600, margin: "auto"}}>
            <Card sx={{p: 3}}>
                <Typography variant="h6">Rechercher une commande</Typography>
                <Stack spacing={2} mt={2}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleSearchOrderByEmail}>
                        Rechercher
                    </Button>
                    {order && order.length > 0 ? (
                        order.map((product: any) => (
                            <Typography key={product.id} variant="body1">
                                {`Commande n°${product.id} par ${product.userId}`}
                            </Typography>
                        ))
                    ) : (
                        <Typography variant="body1">Aucune commande trouvée</Typography>
                    )}
                </Stack>

            </Card>
        </Box>
    );
};

export default Admin;
