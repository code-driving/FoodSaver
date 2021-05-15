import { useState } from "react";
import "./Recipes.scss";

export default function Form(props) {
  const [formData, setFormData] = useState({ ingredients: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <h1>Enter ingredients to search</h1>
      <input
        type="text"
        name="ingredients"
        value={formData.ingredients}
        onChange={handleChange}
        placeholder="apples,oranges"
      ></input>
      <button disabled={!formData.ingredients} onClick={handleSubmit}>
        Go!
      </button>
    </form>
  );
}
