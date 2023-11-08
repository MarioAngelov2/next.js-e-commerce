import React from "react";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import RegisterForm from "./RegisterForm";
import { getCurrentUser } from "@/actions/getCurrentUser";

const Register = async () => {
    const user = await getCurrentUser();

    return (
        <div>
            <Container>
                <FormWrap>
                    <RegisterForm user={user || null}/>
                </FormWrap>
            </Container>
        </div>
    );
};

export default Register;
