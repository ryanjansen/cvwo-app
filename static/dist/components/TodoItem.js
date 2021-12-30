import React, {useState} from "../../_snowpack/pkg/react.js";
import {Box, Text, Checkbox, Flex, Circle} from "../../_snowpack/pkg/@chakra-ui/react.js";
import categoryColors from "../config/categoryColors.js";
import dayjs from "../../_snowpack/pkg/dayjs.js";
function TodoItem({todo, handleUpdate}) {
  const [isChecked, setIsChecked] = useState(todo.done);
  const dateString = dayjs(todo.due_date).format("DD MMM");
  return /* @__PURE__ */ React.createElement(Flex, {
    w: "100%",
    p: 1,
    justifyContent: "space-between"
  }, /* @__PURE__ */ React.createElement(Flex, null, /* @__PURE__ */ React.createElement(Checkbox, {
    isChecked,
    mr: 4,
    size: "lg",
    onChange: (e) => {
      setIsChecked((prev) => !prev);
      setTimeout(() => handleUpdate(todo.id), 300);
    },
    colorScheme: "red"
  }), /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(Text, null, todo.title), todo.due_date && /* @__PURE__ */ React.createElement(Text, {
    fontSize: "sm",
    color: "gray.500"
  }, dateString))), todo.category && /* @__PURE__ */ React.createElement(Flex, {
    alignItems: "center"
  }, /* @__PURE__ */ React.createElement(Circle, {
    mr: 3,
    bgColor: categoryColors[todo.category.color],
    w: "10px",
    h: "10px"
  }), /* @__PURE__ */ React.createElement(Text, null, todo.category.title)));
}
export default TodoItem;
