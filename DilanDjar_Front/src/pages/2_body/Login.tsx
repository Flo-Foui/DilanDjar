import {FC} from 'react';
import Page from "../../components/layout/Page";
import LoginForm from "../../components/auth/LoginForm";

const Login: FC<{}> = ({}) => {
    return (
        <Page>
            <LoginForm/>
        </Page>
    );
};

export default Login;
