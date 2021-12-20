import React from 'react';
import Todos from './Todos';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, RequireAuth } from './useAuth';

interface AppProps {}

function App({}: AppProps) {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/app"
          element={
            <RequireAuth>
              <Todos />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
