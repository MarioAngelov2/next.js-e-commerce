import React from 'react'
import Container from '../components/Container'
import FormWrap from '../components/FormWrap'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <div>
      <Container>
        <FormWrap>
            <LoginForm />
        </FormWrap>
      </Container>
    </div>
  )
}

export default Login
