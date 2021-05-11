import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function ProductForm(props) {
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
  // const [product, setProduct] = useState("");
  // const [expiration_date, setExpiration_date] = useState("");
  // const [quantity, setQuantity] = useState(0);
  // const [price, setPrice] = useState(0);

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
        // value={product}
        // onChange={(event) => setProduct(event.target.value)}
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        placeholder="expiration date"
        inputProps={{ "aria-label": "description" }}
        name="expiration_date"
        // value={expiration_date}
        // onChange={(event) => setExpiration_date(event.target.value)}
        value={formData.expiration_date}
        onChange={handleChange}
      />
      <Input
        placeholder="quantity_grams"
        inputProps={{ "aria-label": "description" }}
        name="quantity_grams"
        // value={quantity}
        // onChange={(event) => setQuantity(event.target.value)}
        value={formData.quantity_grams}
        onChange={handleChange}
      />
      <Input
        placeholder="quantity_units"
        inputProps={{ "aria-label": "description" }}
        name="quantity_units"
        // value={quantity}
        // onChange={(event) => setQuantity(event.target.value)}
        value={formData.quantity_units}
        onChange={handleChange}
      />
      <Input
        placeholder="price"
        inputProps={{ "aria-label": "description" }}
        name="price"
        // value={price}
        // onChange={(event) => setPrice(event.target.value)}
        value={formData.price}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
      <button type="submit">Cancel</button>
    </form>
  );
}
