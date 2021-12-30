import React from "../../_snowpack/pkg/react.js";
import {useAuth} from "../context/useAuth.js";
import {
  Container,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Link,
  Heading,
  Center
} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {
  useLocation,
  useNavigate,
  Link as RouterLink,
  Navigate
} from "../../_snowpack/pkg/react-router-dom.js";
import {useForm} from "../../_snowpack/pkg/react-hook-form.js";
function Login({}) {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const auth = useAuth();
  const error = auth.error;
  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting}
  } = useForm();
  const from = state?.from?.pathname || "/app/inbox";
  const onSubmit = ({username, password}) => {
    auth.login(username, password, () => {
      navigate(from, {replace: true});
    });
  };
  if (auth.user) {
    return /* @__PURE__ */ React.createElement(Navigate, {
      to: "/app"
    });
  }
  return /* @__PURE__ */ React.createElement(Center, {
    h: "80vh"
  }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Heading, null, "Login"), /* @__PURE__ */ React.createElement(Box, {
    as: "form",
    p: 4,
    onSubmit: handleSubmit(onSubmit)
  }, /* @__PURE__ */ React.createElement(FormControl, {
    isInvalid: error,
    mb: 3
  }, /* @__PURE__ */ React.createElement(FormLabel, {
    htmlFor: "username"
  }, "Username"), /* @__PURE__ */ React.createElement(Input, {
    id: "username",
    ...register("username", {
      required: "This is required"
    })
  })), /* @__PURE__ */ React.createElement(FormControl, {
    isInvalid: error,
    mb: 3
  }, /* @__PURE__ */ React.createElement(FormLabel, {
    htmlFor: "password"
  }, "Password"), /* @__PURE__ */ React.createElement(Input, {
    autoComplete: "password",
    id: "password",
    type: "password",
    ...register("password", {
      required: "This is required"
    })
  }), /* @__PURE__ */ React.createElement(FormErrorMessage, null, error && "Wrong username or password")), /* @__PURE__ */ React.createElement(Button, {
    type: "submit",
    mr: 3
  }, "Login"), /* @__PURE__ */ React.createElement(Link, {
    as: RouterLink,
    to: "/signup"
  }, "Don't have an account? Signup here"))));
}
export default Login;
