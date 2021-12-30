import axios from "../../_snowpack/pkg/axios.js";
import React, {useState, useEffect} from "../../_snowpack/pkg/react.js";
import {useParams} from "../../_snowpack/pkg/react-router-dom.js";
import TodoItem from "./TodoItem.js";
import AddTodo from "./AddTodo.js";
import {
  Container,
  VStack,
  Heading,
  StackDivider
} from "../../_snowpack/pkg/@chakra-ui/react.js";
function Todos({}) {
  const [todos, setTodos] = useState([]);
  const category = useParams().category;
  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = () => {
    axios.get("/api/todos", {
      withCredentials: true
    }).then((res) => {
      setTodos(res.data);
    }).catch((err) => console.log(err));
  };
  const addTodo = (title, category_id, date) => {
    axios.post("/api/todos", {
      todo: {title, done: false, category: category_id, due_date: date}
    }, {withCredentials: true}).then((res) => {
      const newTodos = [res.data, ...todos];
      setTodos(newTodos);
    }).catch((err) => console.log(err));
  };
  const deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}`, {withCredentials: true}).then((res) => {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    }).catch((err) => console.log(err));
  };
  const updateTodo = (done, id) => {
    axios.put(`/api/todos/${id}`, {todo: {done}}, {withCredentials: true}).then((res) => {
      const newTodos = todos;
      const index = newTodos.findIndex((todo) => todo.id === res.data.id);
      newTodos[index] = res.data;
      setTodos(newTodos);
    }).catch((err) => console.log(err));
  };
  return /* @__PURE__ */ React.createElement(Container, {
    maxW: "container.sm",
    mt: 10
  }, /* @__PURE__ */ React.createElement(Heading, {
    size: "md",
    mb: "3"
  }, "Todos"), /* @__PURE__ */ React.createElement(AddTodo, {
    addTodo
  }), /* @__PURE__ */ React.createElement(VStack, {
    divider: /* @__PURE__ */ React.createElement(StackDivider, {
      borderColor: "gray.100"
    })
  }, todos.map((todo) => /* @__PURE__ */ React.createElement(TodoItem, {
    todo,
    key: todo.id,
    handleUpdate: deleteTodo
  }))));
}
export default Todos;
