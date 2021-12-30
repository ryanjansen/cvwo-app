import {
  Box,
  VStack,
  Text,
  Flex,
  Input,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Circle,
  StackDivider
} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {HiOutlineTag} from "../../_snowpack/pkg/react-icons/hi.js";
import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import {connect} from "../../_snowpack/pkg/react-redux.js";
import {
  addCategory,
  selectCategories,
  fetchCategories,
  categoriesStatus
} from "../redux/categoriesSlice.js";
import categoryColors from "../config/categoryColors.js";
function CategoriesPicker({
  categories,
  category,
  handleCategoryChange,
  addCategory: addCategory2,
  fetchCategories: fetchCategories2,
  status
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const [addCategoryInput, setAddCategoryInput] = useState("");
  useEffect(() => {
    if (status === "idle") {
      fetchCategories2();
    }
  }, [status]);
  const handleAddCategory = (title) => {
  };
  return /* @__PURE__ */ React.createElement(Popover, {
    isOpen,
    onClose: close
  }, /* @__PURE__ */ React.createElement(PopoverTrigger, null, /* @__PURE__ */ React.createElement(IconButton, {
    "aria-label": "select category",
    icon: /* @__PURE__ */ React.createElement(HiOutlineTag, null),
    fontSize: "20px",
    colorScheme: category?.color.split(".")[0],
    onClick: open
  })), /* @__PURE__ */ React.createElement(PopoverContent, {
    w: "fit-content",
    p: 0
  }, /* @__PURE__ */ React.createElement(PopoverArrow, null), /* @__PURE__ */ React.createElement(PopoverBody, {
    p: 0
  }, /* @__PURE__ */ React.createElement(VStack, {
    divider: /* @__PURE__ */ React.createElement(StackDivider, null),
    spacing: 0
  }, categories.map((c) => /* @__PURE__ */ React.createElement(Box, {
    display: "flex",
    justifyContent: "center",
    w: "100%",
    cursor: "pointer",
    p: 2,
    _hover: {background: "gray.100"},
    transition: "background 0.2s linear",
    onClick: () => {
      handleCategoryChange(c);
      close();
    }
  }, /* @__PURE__ */ React.createElement(Flex, {
    minW: "100px",
    px: 4,
    mx: "auto",
    alignItems: "center"
  }, /* @__PURE__ */ React.createElement(Circle, {
    mr: 3,
    bgColor: categoryColors[c.color],
    w: "10px",
    h: "10px"
  }), /* @__PURE__ */ React.createElement(Text, null, c.title)))), /* @__PURE__ */ React.createElement(Input, {
    focusBorderColor: "red.500",
    width: "150px",
    placeholder: "+ Add Category",
    variant: "flushed",
    textAlign: "center",
    value: addCategoryInput,
    onChange: (e) => setAddCategoryInput(e.target.value),
    onKeyDown: (e) => {
      if (e.key === "Enter") {
        const color = categoryColors.entities[(categories.length + 1) % categoryColors.entities.length];
        addCategory2({title: addCategoryInput, color});
        setAddCategoryInput("");
      }
    }
  })))));
}
const connector = connect((state) => ({
  categories: selectCategories(state),
  status: categoriesStatus(state)
}), {
  addCategory,
  fetchCategories
});
export default connector(CategoriesPicker);
