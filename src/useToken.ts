import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');

    if (!tokenString) {
      return null;
    }

    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: { token: string }) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const deleteToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  }

  return {
    setToken: saveToken,
    deleteToken,
    token,
  };
}
