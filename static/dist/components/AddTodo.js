import React, {useState} from "../../_snowpack/pkg/react.js";
import {Flex, Input} from "../../_snowpack/pkg/@chakra-ui/react.js";
import Datepicker from "./Datepicker.js";
import CategoriesPicker from "./CategoriesPicker.js";
function AddTodo({addTodo}) {
  const [addTodoInput, setAddTodoInput] = useState("");
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState(null);
  const handleDateChange = (date2) => {
    setDate(date2);
  };
  const handleCategoryChange = (category2) => {
    setCategory(category2);
  };
  return /* @__PURE__ */ React.createElement(Flex, null, /* @__PURE__ */ React.createElement(Input, {
    value: addTodoInput,
    onChange: (e) => setAddTodoInput(e.target.value),
    onKeyDown: (e) => {
      if (e.key === "Enter") {
        addTodo(addTodoInput, category?.id, date);
        setAddTodoInput("");
        setDate(null);
        setCategory(null);
      }
    },
    variant: "flushed",
    placeholder: "Add todo",
    mb: 6,
    focusBorderColor: "red.500",
    mr: 3
  }), /* @__PURE__ */ React.createElement(Datepicker, {
    handleDateChange,
    date
  }), /* @__PURE__ */ React.createElement(CategoriesPicker, {
    category,
    handleCategoryChange
  }));
}
export default AddTodo;
