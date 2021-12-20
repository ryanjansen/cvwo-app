import React, { useRef, ReactElement } from 'react';
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
  passwordConfirm: string;
}

function Signup({ setToken }: Props): ReactElement {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const onSubmit = ({ username, password, passwordConfirm }: FormValues) => {
    axios
      .post('http://localhost:3000/signup', {
        user: {
          username,
          password,
          password_confirmation: passwordConfirm,
        },
      })
      .then((res) => {
        setToken(res.data);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const password = useRef({});
  password.current = watch('password', '');

  return (
    <Container>
      <Box as="form" p={4} onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.username} mb={3}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            {...register('username', {
              required: 'This is required',
            })}
          />
        </FormControl>
        <FormControl isInvalid={errors.password} mb={3}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            {...register('password', {
              required: 'This is required',
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.passwordConfirm} mb={3}>
          <FormLabel htmlFor="passwordConfirm">Confirm Password</FormLabel>
          <Input
            id="passwordConfirm"
            type="password"
            {...register('passwordConfirm', {
              required: 'This is required',
              validate: (value) =>
                value === password.current || 'The passwords do not match',
            })}
          />
          <FormErrorMessage>
            {errors.passwordConfirm && errors.passwordConfirm.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" mr={3}>
          Signup
        </Button>
        <Link as={RouterLink} to="/login">
          Have an account? Login here
        </Link>
      </Box>
    </Container>
  );
}

export default Signup;
