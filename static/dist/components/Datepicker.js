import React, {forwardRef} from "../../_snowpack/pkg/react.js";
import ReactDatePicker from "../../_snowpack/pkg/react-datepicker.js";
import {CalendarIcon} from "../../_snowpack/pkg/@chakra-ui/icons.js";
import {Button, IconButton} from "../../_snowpack/pkg/@chakra-ui/react.js";
import "../../_snowpack/pkg/react-datepicker/dist/react-datepicker.css.proxy.js";
import "./date-picker.css.proxy.js";
import dayjs from "../../_snowpack/pkg/dayjs.js";
function Datepicker({handleDateChange, date}) {
  const CustomButton = forwardRef(({onClick}, ref) => {
    return date ? /* @__PURE__ */ React.createElement(Button, {
      colorScheme: "red",
      mr: "2",
      onClick
    }, dayjs(date).format("DD MMM")) : /* @__PURE__ */ React.createElement(IconButton, {
      mr: "2",
      onClick,
      "aria-label": "Choose due date",
      icon: /* @__PURE__ */ React.createElement(CalendarIcon, null)
    });
  });
  return /* @__PURE__ */ React.createElement(ReactDatePicker, {
    onChange: handleDateChange,
    selected: date,
    customInput: /* @__PURE__ */ React.createElement(CustomButton, null),
    popperPlacement: "bottom",
    showPopperArrow: true
  });
}
export default Datepicker;
