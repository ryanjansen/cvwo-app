import React, {useRef} from "../../_snowpack/pkg/react.js";
import {
  Container,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Link,
  Center,
  Heading
} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {useNavigate, Link as RouterLink} from "../../_snowpack/pkg/react-router-dom.js";
import {useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {useAuth} from "../context/useAuth.js";
function Signup({}) {
  const navigate = useNavigate();
  const auth = useAuth();
  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting},
    watch
  } = useForm();
  const onSubmit = ({username, password: password2, passwordConfirm}) => {
    auth.signup(username, password2, passwordConfirm, () => {
      navigate("/app/inbox", {replace: true});
    });
  };
  const password = useRef({});
  password.current = watch("password", "");
  return /* @__PURE__ */ React.createElement(Center, {
    height: "80vh"
  }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(Heading, null, "Signup"), /* @__PURE__ */ React.createElement(Box, {
    as: "form",
    p: 4,
    onSubmit: handleSubmit(onSubmit)
  }, /* @__PURE__ */ React.createElement(FormControl, {
    isInvalid: errors.username,
    mb: 3
  }, /* @__PURE__ */ React.createElement(FormLabel, {
    htmlFor: "username"
  }, "Username"), /* @__PURE__ */ React.createElement(Input, {
    id: "username",
    ...register("username", {
      required: "This is required"
    })
  })), /* @__PURE__ */ React.createElement(FormControl, {
    isInvalid: errors.password,
    mb: 3
  }, /* @__PURE__ */ React.createElement(FormLabel, {
    htmlFor: "password"
  }, "Password"), /* @__PURE__ */ React.createElement(Input, {
    id: "password",
    type: "password",
    ...register("password", {
      required: "This is required"
    })
  }), /* @__PURE__ */ React.createElement(FormErrorMessage, null, errors.password && errors.password.message)), /* @__PURE__ */ React.createElement(FormControl, {
    isInvalid: errors.passwordConfirm,
    mb: 3
  }, /* @__PURE__ */ React.createElement(FormLabel, {
    htmlFor: "passwordConfirm"
  }, "Confirm Password"), /* @__PURE__ */ React.createElement(Input, {
    id: "passwordConfirm",
    type: "password",
    ...register("passwordConfirm", {
      required: "This is required",
      validate: (value) => value === password.current || "The passwords do not match"
    })
  }), /* @__PURE__ */ React.createElement(FormErrorMessage, null, errors.passwordConfirm && errors.passwordConfirm.message)), /* @__PURE__ */ React.createElement(Button, {
    type: "submit",
    mr: 3
  }, "Signup"), /* @__PURE__ */ React.createElement(Link, {
    as: RouterLink,
    to: "/login"
  }, "Have an account? Login here"))));
}
export default Signup;
