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
  Center,
  Heading,
} from '@chakra-ui/react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from './useAuth';

interface tokenI {
  token: string;
}

interface Props {}

interface FormValues {
  username: string;
  password: string;
  passwordConfirm: string;
}

function Signup({}: Props): ReactElement {
  const navigate = useNavigate();
  const auth = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const onSubmit = ({ username, password, passwordConfirm }: FormValues) => {
    auth.signup(username, password, passwordConfirm, () => {
      navigate('/app/inbox', { replace: true });
    });
  };

  const password = useRef({});
  password.current = watch('password', '');

  return (
    <Center height="80vh">
      <Container>
        <Heading>Signup</Heading>
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
    </Center>
  );
}

export default Signup;
