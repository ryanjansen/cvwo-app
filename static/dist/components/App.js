import React from "../../_snowpack/pkg/react.js";
import Todos from "./TodoList.js";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Home from "./Home.js";
import {Routes, Route, Navigate} from "../../_snowpack/pkg/react-router-dom.js";
import {AuthProvider, RequireAuth} from "../context/useAuth.js";
function App({}) {
  return /* @__PURE__ */ React.createElement(AuthProvider, null, /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, {
    path: "/",
    element: /* @__PURE__ */ React.createElement(Home, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/login",
    element: /* @__PURE__ */ React.createElement(Login, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/signup",
    element: /* @__PURE__ */ React.createElement(Signup, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/app",
    element: /* @__PURE__ */ React.createElement(Navigate, {
      replace: true,
      to: "/app/inbox"
    })
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/app/:category",
    element: /* @__PURE__ */ React.createElement(RequireAuth, null, /* @__PURE__ */ React.createElement(Todos, null))
  })));
}
export default App;
