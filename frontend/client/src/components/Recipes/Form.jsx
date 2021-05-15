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
      <h1 style={{marginBottom: '1.5rem'}}>Enter ingredients to search</h1>
      <input
          type="text"
          name='ingredients'
          value={formData.ingredients}
          onChange={handleChange}
          placeholder='apples,oranges'
        ></input>
        <button style={{marginLeft: '1.5rem'}} disabled={!formData.ingredients} onClick={handleSubmit}>search</button>
    </form>
  )
}
