import React, { ReactElement } from 'react';
import { Link } from '@chakra-ui/react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

interface Props {}

function Home({}: Props): ReactElement {
  const auth = useAuth();

  if (auth.user) {
    return <Navigate to="/app" />;
  }

  return (
    <div>
      <h1>Home</h1>
      <Link as={RouterLink} to="/login">
        Login
      </Link>
    </div>
  );
}

export default Home;
