import React from "react";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import LoginForm from "./LoginForm";
import { getCurrentUser } from "@/actions/getCurrentUser";

const Login = async () => {
  const user = await getCurrentUser();

    return (
        <div>
            <Container>
                <FormWrap>
                    <LoginForm user={user || null}/>
                </FormWrap>
            </Container>
        </div>
    );
};

export default Login;
