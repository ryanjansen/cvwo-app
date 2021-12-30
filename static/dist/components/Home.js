import React from "../../_snowpack/pkg/react.js";
import {
  Box,
  Heading,
  Text,
  Container,
  Button,
  ButtonGroup,
  Center
} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {Link as RouterLink, Navigate} from "../../_snowpack/pkg/react-router-dom.js";
import {useAuth} from "../context/useAuth.js";
import HomeBg from "../../home-bg.jpg.proxy.js";
function Home({}) {
  const auth = useAuth();
  if (auth.user) {
    return /* @__PURE__ */ React.createElement(Navigate, {
      to: "/app"
    });
  }
  return /* @__PURE__ */ React.createElement(Box, {
    w: "100vw",
    h: "100vh",
    backgroundImage: HomeBg,
    bgRepeat: "no-repeat",
    bgSize: "cover"
  }, /* @__PURE__ */ React.createElement(Box, {
    p: 4
  }, /* @__PURE__ */ React.createElement(Heading, null, "CVWO")), /* @__PURE__ */ React.createElement(Center, {
    h: "500px"
  }, /* @__PURE__ */ React.createElement(Container, {
    maxW: "container.xl"
  }, /* @__PURE__ */ React.createElement(Heading, {
    size: "4xl"
  }, "Get Shit Done"), /* @__PURE__ */ React.createElement(Text, {
    fontSize: "2xl",
    mb: 3
  }, "Welcome to the world's best todo app"), /* @__PURE__ */ React.createElement(ButtonGroup, null, /* @__PURE__ */ React.createElement(Button, {
    as: RouterLink,
    to: "/signup",
    size: "lg",
    colorScheme: "red"
  }, "Signup"), /* @__PURE__ */ React.createElement(Button, {
    as: RouterLink,
    to: "/login",
    size: "lg",
    colorScheme: "teal"
  }, "Login")))));
}
export default Home;
