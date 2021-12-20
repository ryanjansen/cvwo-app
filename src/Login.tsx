import React, { useState, ReactElement } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Link,
} from '@chakra-ui/react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface tokenI {
  token: string;
}

interface Props {
  setToken: (token: tokenI) => void;
}

interface FormValues {
  username: string;
  password: string;
}

function Login({ setToken }: Props): ReactElement {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [error, setError] = useState(false);

  const onSubmit = ({ username, password }: FormValues) => {
    axios
      .post('http://localhost:3000/login', {
        username,
        password,
      })
      .then((res) => {
        setToken(res.data);
        navigate('/');
      })
      .catch((err) => setError(true));
  };

  return (
    <Container>
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
  );
}

export default Login;
