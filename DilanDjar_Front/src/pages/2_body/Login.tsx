import {FC} from 'react';

const Login: FC<{}> = ({}) => {
    return (
        <>

        </>
    );
};

export default Login;


/*
import {FC, useContext, useEffect} from 'react';
import {Box, Button, Card, Stack, TextField, useTheme} from "@mui/material";
import {useNavigate} from "react-router";
import {SubmitHandler, useForm} from "react-hook-form";
import {AuthContext} from "../../auth/AuthContext";

interface LoginFormInput {
    email: string
    password: string
}

const LoginForm: FC<{}> = ({}) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
        console.log(data);
        console.log(errors);
        authContext?.setIsLoggedIn(true)
    }

    useEffect(() => {
        if (authContext?.isLoggedIn) {
            console.log('login ' + authContext?.isLoggedIn)
            navigate("/");
        }
    }, [authContext?.isLoggedIn]);

    return (
        <Card sx={{
            height: "100vh",
            backgroundColor: theme.palette.background.paper,
            p: 2,
            width: 300,
            justifyContent: ""
        }}>
            <Box
                margin={"auto"}
                color="white"
                component="form"
                sx={{'& > :not(style)': {m: 1, width: '25ch'}}}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    margin={"auto"}
                    spacing={2}>
                    <TextField label="Email" variant="outlined" {...register("email")}/>
                    <TextField label="Mot de passe" variant="outlined" {...register("password")} />
                    <Button variant="contained" type="submit">Connexion</Button>
                </Stack>
            </Box>
        </Card>
    );
};

export default LoginForm;*/
