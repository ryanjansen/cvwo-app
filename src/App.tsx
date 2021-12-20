import React from 'react';
import Todos from './Todos';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import useToken from './useToken';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';

interface AppProps {}

function App({}: AppProps) {
  const navigate = useNavigate();
  const { token, setToken, deleteToken } = useToken();

  const handleLogout = () => {
    deleteToken();
    navigate('/');
  };

  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
      </Routes>
    );
  }

  return (
    <Box>
      <Routes>
        <Route path="/" element={<Todos token={token} />} />
      </Routes>
      <Button onClick={handleLogout} colorScheme="red">
        Logout
      </Button>
    </Box>
  );
}

export default App;
