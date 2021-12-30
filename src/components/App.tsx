import React from 'react';
import Todos from './TodoList';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, RequireAuth } from '../context/useAuth';

interface AppProps {}

function App({}: AppProps) {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<Navigate replace to="/app/inbox" />} />
        <Route
          path="/app/:category"
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
