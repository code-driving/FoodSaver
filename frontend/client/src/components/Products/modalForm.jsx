import { useState } from "react";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { Button } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "./ProductForm";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import "./modalForm.scss";

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#802026",
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: "white",
        color: "#802026",
      },
      dayLabel: {
        textTransform: "uppercase",
        color: "#802026",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#802026",
      },
      daySelected: {
        backgroundColor: "#802026",
        "&:hover": {
          backgroundColor: "#802026",
        },
      },
      current: {
        color: "#802026",
      },
    },
    MuiButton: {
      label: {
        color: "#802026",
      },
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function ProductForm(props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const { selectedName, selectedItemDate } = props;
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    quantity_grams: 0,
    quantity_units: 0,
  });

  const localId = localStorage.getItem("token");

  const handleSubmit = (event) => {
    const localId = localStorage.getItem("token");
    event.preventDefault();
    props.onSubmitEdit({
      ...formData,
      expiration_date: selectedDate,
      product_id: props.product_id,
      user_id: localId,
    });
    handleReset();
  };

  const handleSubmitConsume = (event) => {
    const localId = localStorage.getItem("token");
    event.preventDefault();
    props.onSubmitconsume({
      ...formData,
      expiration_date: selectedDate,
      product_id: props.product_id,
      user_id: localId,
    });
    handleReset();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    Array.from(document.querySelectorAll("Input")).forEach(
      (input) => (input.value = "")
    );
    setFormData({
      formData: [{}],
    });
  };
  // console.log("selectedName from modal -->", selectedName);
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="product name"
        inputProps={{ "aria-label": "description" }}
        name="name"
        value={formData.name || ""}
        // value={formData.name || ""}
        onChange={handleChange}
      />
      <Input
        placeholder="quantity grams"
        inputProps={{ "aria-label": "description" }}
        name="quantity_grams"
        value={formData.quantity_grams || ""}
        onChange={handleChange}
      />
      <Input
        placeholder="quantity units"
        inputProps={{ "aria-label": "description" }}
        name="quantity_units"
        value={formData.quantity_units || ""}
        onChange={handleChange}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={materialTheme}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            format="MM/dd/yyyy"
            name="expiration_date"
            value={selectedDate || ""}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
      <div className="modalBottom">
        <button className="button modal" onClick={handleSubmit}>
          edit
        </button>
        <div className="modalBottom1">
          <button className="button modal" onClick={handleSubmitConsume}>
            consume
          </button>
        </div>
      </div>
    </form>
  );
}
