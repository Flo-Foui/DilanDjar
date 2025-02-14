import {useState} from "react";
import {Box, Button, Card, Stack, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import {SubmitHandler, useForm} from "react-hook-form";
import {post} from "../../api/api";
import Page from "../../components/layout/Page";
import {RegisterFormInput} from "../../@types/RegisterFormInput";

const RegisterForm = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, watch, formState: {errors}} = useForm<RegisterFormInput>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit: SubmitHandler<RegisterFormInput> = async (data) => {
        setErrorMessage(null);

        if (data.password !== data.confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas !");
            return;
        }

        try {
            const response = await post("http://localhost:8080/auth/register", {
                email: data.email,
                password: data.password,
            });

            if (response) {
                console.log("Inscription réussie", response);
                navigate("/Login");
            } else {
                setErrorMessage("Erreur lors de l'inscription !");
            }
        } catch (error) {
            setErrorMessage("Une erreur est survenue !");
            console.error("Erreur lors de l'inscription", error);
        }
    };

    return (
        <Page>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                <Card sx={{p: 2, width: 300}}>
                    <Typography variant="h5" textAlign="center">Créer un compte</Typography>
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
                            <TextField type="password" label="Confirmer le mot de passe"
                                       variant="outlined" {...register("confirmPassword", {required: "Confirmation requise"})}
                                       error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message}/>
                            <Button variant="contained" type="submit">S'inscrire</Button>
                            <Typography onClick={() => navigate("/Login")}>
                                Déjà inscrit ? Cliquez ici pour vous connectez ! ➡️ Zoooo ✨
                            </Typography>
                        </Stack>
                    </Box>
                </Card>
            </Box>
        </Page>
    );
}

export default RegisterForm;
