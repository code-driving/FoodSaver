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
    product: "",
    expiration_date: new Date().toLocaleString,
    quantity: 0,
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
        placeholder="product"
        inputProps={{ "aria-label": "description" }}
        name="product"
        // value={product}
        // onChange={(event) => setProduct(event.target.value)}
        value={formData.product}
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
        placeholder="quantity"
        inputProps={{ "aria-label": "description" }}
        name="quantity"
        // value={quantity}
        // onChange={(event) => setQuantity(event.target.value)}
        value={formData.quantity}
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
