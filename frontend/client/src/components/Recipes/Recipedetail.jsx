import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import "./details.scss";
import useApplicationData from '../../hooks/useApplicationData'
import { useParams, Redirect } from 'react-router-dom';
import "./Recipes.scss"

export default function RecipeDetail(props) {
  const [redirect, setRedirect] = useState(false);
  const { setRecipe } = props;
  
  const [details, setDetails] = useState({
    steps: [{ steps: [] }],
    info: {
      image: "",
      extendedIngredients: [],
      time: 0,
      vegetarian: "",
      servings: "",
    },
  });
  
  
  const { id } = useParams();
  console.log("id from useParams", { id });
  const API_KEY = process.env.REACT_APP_API_KEY  
  
  useEffect(() => {
    if ({id}) {
      const url = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}&boolean=false`;
      const url2 = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&boolean=false`;
      Promise.all([axios.get(url), axios.get(url2)]).then((res) => {
        console.log(res);
        setDetails((prev) => ({
          ...prev,
          steps: res[0].data,
          info: res[1].data,
        }));
      });
    }
  }, []);
  let steps = details.steps[0]["steps"];
  let name =  details.info['title']
  let img = details.info["image"];
  let ingredients = details.info["extendedIngredients"].map((ingredients) => (
    <li> {ingredients["nameClean"]}</li>
  ));
  let time = details.info["readyInMinutes"];
  let vegetarian = details.info["vegetarian"];
  let servings = details.info["servings"];
  const localId = localStorage.getItem("token");
  // let recipe_id = props.match.params.id;
  console.log("id from useParams after call",id );
  
  
  const value = {
        recipie_name: name,
        user_id: localId, 
        recipe_id: id
  }
  console.log("value from Recipe Detail", value)
  
  const EachStep = steps.map((step, index) => {
    return <li key={index}>{step.step}</li>;
  });
  return (
    <section className="recipe-details-container">
      <h1> Recipe Details</h1>
      <div>
        <img src={img} alt={"food image"} class="recipe-image"></img>
        {/* <div style={{ marginLeft: 10 }}> */}
        <div className="recipe_detail">
          <h2>Recipe Info</h2>
          <ul>
            <li>Time: {time} mins</li>
            <li>{vegetarian ? "Vegetarian : No" : "Vegetarian : Yes"}</li>
            <li>Serves : {servings}</li>
          </ul>
          <h2>Ingredients needed</h2>
          <ul>{ingredients}</ul>
        </div>
      </div>
      <h2>Instructions</h2>
      <ul className="recipe_detail">{EachStep}</ul>
      <Link to={`/favourites`}><button onClick={() => setRecipe(value)}>save</button></Link>
    </section>
  );
}

