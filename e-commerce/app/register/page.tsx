import React from "react";
import Container from "../components/Container";
import Input from "../components/inputs/Input";
import FormWrap from "../components/FormWrap";
import RegisterForm from "./RegisterForm";

const Register = () => {
    return (
        <div>
            <Container>
                <FormWrap>
                    <RegisterForm />
                </FormWrap>
            </Container>
        </div>
    );
};

export default Register;
