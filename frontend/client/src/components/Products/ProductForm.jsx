import { useState, Fragment } from "react";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "./ProductForm.scss";
import { isWithinInterval } from "date-fns";
import chineesefood from '../images/icons/chinesefood.png';
import coffee from '../images/icons/coffee.png';
import pasta from '../images/icons/pasta.png';
import plate from '../images/icons/plate.png';


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
    quantity_units: 0,
  });

  const localId = localStorage.getItem("token");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({
      ...formData,
      expiration_date: selectedDate,
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

  return (
    <>
    <div className="animated_images">
      <img src={chineesefood} className="animated_images__food"alt="chineese food" />
      <img src={pasta} className="animated_images__pasta" alt="pasta" />
      <img src={coffee} className="animated_images__coffee" alt="coffee" />
      <img src={plate} className="animated_images__plate" alt="plate" />
    </div>
    <h2 style={{marginBottom: '1.5rem'}}>Add new products</h2>
    {/* <Grid container justify="space-around">
    // <h2>Add new products</h2>
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
            // label="Date picker dialog"
            format="MM/dd/yyyy"
            name="expiration_date"
            value={selectedDate || ""}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            />
        </MuiPickersUtilsProvider>
      </form>
      <button disabled={!formData.name} onClick={handleSubmit} type="submit">
        save
      </button>
      <button style={{marginTop: '1rem'}} onClick={handleReset}>cancel</button>
      </Grid> */}
    <form onSubmit={handleSubmit}>
      <label className="sr-only" for="name">name</label>
      <input 
          className="inputs_form"
          name="name"
          placeholder="product name"
          value={formData.name || ""}
          onChange={handleChange}
      />
        
      <label class="sr-only" for="grams">grams</label>
      <input 
          className="inputs_form"
          name="quantity_grams"
          placeholder="grams"
          value={formData.quantity_grams || ""}
          onChange={handleChange}
      />
      <label class="sr-only" for="units">units</label>
      <input 
          className="inputs_form"
          name="quantity_units"
          placeholder="units"
          value={formData.quantity_units || ""}
          onChange={handleChange}
      />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
        </MuiPickersUtilsProvider>
      </form>
      <div className="buttons_form">
        <button className="button" onClick={handleReset}>cancel</button>
        <button className="button" disabled={!formData.name} onClick={handleSubmit} type="submit">
          save
        </button>
      </div>
      </>
  );
}
