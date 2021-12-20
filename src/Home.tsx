import React, { ReactElement } from 'react';
import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface Props {}

function Home({}: Props): ReactElement {
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
