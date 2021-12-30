import React, { useState, ReactElement } from 'react';
import axios from 'axios';
import { useAuth } from '../context/useAuth';
import {
  Container,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Link,
  Heading,
  Center,
} from '@chakra-ui/react';
import {
  useLocation,
  useNavigate,
  Link as RouterLink,
  Navigate,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface tokenI {
  token: string;
}

interface Props {}

interface FormValues {
  username: string;
  password: string;
}

interface CustomizedState {
  from: {
    pathname: string;
  };
}

function Login({}: Props): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CustomizedState;
  const auth = useAuth();
  const error = auth.error;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const from = state?.from?.pathname || '/app/inbox';

  const onSubmit = ({ username, password }: FormValues) => {
    auth.login(username, password, () => {
      navigate(from, { replace: true });
    });
  };

  if (auth.user) {
    return <Navigate to="/app" />;
  }

  return (
    <Center h="80vh">
      <Container>
        <Heading>Login</Heading>
        <Box as="form" p={4} onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={error} mb={3}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              {...register('username', {
                required: 'This is required',
              })}
            />
          </FormControl>
          <FormControl isInvalid={error} mb={3}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              autoComplete="password"
              id="password"
              type="password"
              {...register('password', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {error && 'Wrong username or password'}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" mr={3}>
            Login
          </Button>
          <Link as={RouterLink} to="/signup">
            Don't have an account? Signup here
          </Link>
        </Box>
      </Container>
    </Center>
  );
}

export default Login;
