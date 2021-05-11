import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function ProductForm(props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    expiration_date: new Date().toLocaleString,
    quantity_grams: 0,
    quantity_units: 0,
    price: 0,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Grid container justify="space-around">
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
        value={formData.name}
        onChange={handleChange}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          name="expiration_date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
        }}
      />
      </MuiPickersUtilsProvider>
      <Input
        placeholder="quantity_grams"
        inputProps={{ "aria-label": "description" }}
        name="quantity_grams"
        value={formData.quantity_grams}
        onChange={handleChange}
      />
      <Input
        placeholder="quantity_units"
        inputProps={{ "aria-label": "description" }}
        name="quantity_units"
        value={formData.quantity_units}
        onChange={handleChange}
      />
      <Input
        placeholder="price"
        inputProps={{ "aria-label": "description" }}
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
      <button type="submit">Cancel</button>
    </form>
    </Grid>
  );
}

