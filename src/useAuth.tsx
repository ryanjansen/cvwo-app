import React, {
  useState,
  useMemo,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from 'react';
import * as authApi from './api/auth';

import { Navigate, useLocation, useNavigate } from 'react-router-dom';

interface AuthContextType {
  user?: any;
  loading: boolean;
  error?: any;
  login: (username: string, password: string, callback: VoidFunction) => void;
  signup: (
    username: string,
    password: string,
    passwordConfirm: string,
    callback: VoidFunction,
  ) => void;
  logout: (callback: VoidFunction) => void;
}

let AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  useEffect(() => {
    authApi
      .getUser()
      .then((user) => {
        setUser(user);
      })
      .catch((_) => {})
      .finally(() => setLoadingInitial(false));
  }, []);

  const login = (
    username: string,
    password: string,
    callback: VoidFunction,
  ) => {
    setLoading(true);
    authApi
      .login(username, password)
      .then((user) => {
        setUser(user);
        callback();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const signup = (
    username: string,
    password: string,
    password_confirmation: string,
    callback: VoidFunction,
  ) => {
    setLoading(true);
    authApi
      .signup(username, password, password_confirmation)
      .then((user) => {
        setUser(user);
        callback();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const logout = (callback: VoidFunction) => {
    authApi.logout().then(() => {
      setUser(undefined);
      callback();
    });
  };

  const memoizedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signup,
      logout,
    }),
    [user, loading, error],
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
