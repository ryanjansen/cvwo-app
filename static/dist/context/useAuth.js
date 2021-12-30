import React, {
  useState,
  useMemo,
  useEffect,
  useContext,
  createContext
} from "../../_snowpack/pkg/react.js";
import * as authApi from "../api/auth.js";
import {Navigate, useLocation} from "../../_snowpack/pkg/react-router-dom.js";
let AuthContext = createContext({});
export function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (error)
      setError(null);
  }, [location.pathname]);
  useEffect(() => {
    authApi.getUser().then((user2) => {
      setUser(user2);
    }).catch((_) => {
    }).finally(() => setLoadingInitial(false));
  }, []);
  const login = (username, password, callback) => {
    setLoading(true);
    authApi.login(username, password).then((user2) => {
      setUser(user2);
      callback();
    }).catch((error2) => setError(error2)).finally(() => setLoading(false));
  };
  const signup = (username, password, password_confirmation, callback) => {
    setLoading(true);
    authApi.signup(username, password, password_confirmation).then((user2) => {
      setUser(user2);
      callback();
    }).catch((error2) => setError(error2)).finally(() => setLoading(false));
  };
  const logout = (callback) => {
    authApi.logout().then(() => {
      setUser(void 0);
      callback();
    });
  };
  const memoizedValue = useMemo(() => ({
    user,
    loading,
    error,
    login,
    signup,
    logout
  }), [user, loading, error]);
  return /* @__PURE__ */ React.createElement(AuthContext.Provider, {
    value: memoizedValue
  }, !loadingInitial && children);
}
export function useAuth() {
  return useContext(AuthContext);
}
export function RequireAuth({children}) {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.user) {
    return /* @__PURE__ */ React.createElement(Navigate, {
      to: "/login",
      state: {from: location}
    });
  }
  return children;
}
