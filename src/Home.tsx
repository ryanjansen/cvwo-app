import React, { ReactElement } from 'react';
import {
  Box,
  Link,
  Heading,
  Text,
  Container,
  Button,
  ButtonGroup,
  Center,
  Flex,
} from '@chakra-ui/react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import HomeBg from '../public/home-bg.jpg';

interface Props {}

function Home({}: Props): ReactElement {
  const auth = useAuth();

  if (auth.user) {
    return <Navigate to="/app" />;
  }

  return (
    <Box
      w={'100vw'}
      h={'100vh'}
      backgroundImage={HomeBg}
      bgRepeat={'no-repeat'}
      bgSize={'cover'}
    >
      <Box p={4}>
        <Heading>CVWO</Heading>
      </Box>
      <Center h="500px">
        <Container maxW="container.xl">
          <Heading size={'4xl'}>Get Shit Done</Heading>
          <Text fontSize={"2xl"} mb={3}>Welcome to the world's best todo app</Text>
          <ButtonGroup >
            <Button as={RouterLink} to="/signup" size="lg" colorScheme={'red'}>Signup</Button>
            <Button as={RouterLink} to="/login" size="lg" colorScheme={'teal'} >Login</Button>
          </ButtonGroup>
        </Container>
      </Center>
    </Box>
  );
}

export default Home;
