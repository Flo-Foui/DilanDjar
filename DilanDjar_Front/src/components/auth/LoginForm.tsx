import {useContext, useState} from "react";
import {Box, Button, Card, Stack, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import {SubmitHandler, useForm} from "react-hook-form";
import {post} from "../../api/api";
import {AuthContext} from "../../context/AuthContext";
import Page from "../../components/layout/Page";
import {LoginFormInput} from "../../@types/LoginFormInput";

const LoginForm = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormInput>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
        setErrorMessage(null);
        try {
            const response = await post(`http://localhost:8080/auth/login`, data);

            if (response) {
                authContext?.setIsLoggedIn(true);
                authContext?.setToken(response.data);
                navigate("/");
            } else {
                setErrorMessage("Identifiants incorrects !");
            }
        } catch (error) {
            setErrorMessage("Une erreur est survenue !");
            console.error("Erreur lors de la connexion", error);
        }
    };

    return (
        <Page>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                <Card sx={{p: 2, width: 300}}>
                    <Typography variant="h5" textAlign="center">Connexion</Typography>
                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}

                    <Box component="form"
                         sx={{display: "flex", justifyContent: "center", '& > :not(style)': {m: 1, width: '25ch'}}}
                         noValidate autoComplete="off"
                         onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <TextField label="Email"
                                       variant="outlined" {...register("email", {required: "Email requis"})}
                                       error={!!errors.email} helperText={errors.email?.message}/>
                            <TextField type="password" label="Mot de passe"
                                       variant="outlined" {...register("password", {required: "Mot de passe requis"})}
                                       error={!!errors.password} helperText={errors.password?.message}/>
                            <Button variant="contained" type="submit">Se connecter</Button>
                            <Typography onClick={() => navigate("/Register")}>
                                Pas encore de compte ? Cliquez ici pour vous inscrire ! ➡️ Zoooo ✨
                            </Typography>
                        </Stack>
                    </Box>
                </Card>
            </Box>
        </Page>
    );
}

export default LoginForm;

