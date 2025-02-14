import {FC} from 'react';
import Page from "../../components/layout/Page";
import RegisterForm from "../../components/auth/RegisterForm";

const Register: FC<{}> = ({}) => {

    return (
        <Page>
            <RegisterForm/>
        </Page>
    );
};

export default Register;
