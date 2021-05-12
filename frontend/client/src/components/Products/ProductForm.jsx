import { useState } from "react";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import "./ProductForm";
import { isWithinInterval } from "date-fns";

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
  
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    quantity_grams: 0,
    quantity_units: 0
  });

  const localId = localStorage.getItem("token");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({...formData, expiration_date: selectedDate, user_id: localId});
    handleReset();
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleReset = () => {
    Array.from(document.querySelectorAll("Input")).forEach(
      input => (input.value = "")
      );
      setFormData({ 
        formData: [{}]
      });
  };

  return (
    <Grid container justify="space-around" alignItems="center">
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
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          name="expiration_date"
          value={selectedDate || ""}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
        }}
      />
      </MuiPickersUtilsProvider>
    </form>
      <button onClick={handleSubmit} type="submit">
        YES
      </button>
      <button onClick={handleReset}>
        NO
      </button>
    </Grid>
  );
}

