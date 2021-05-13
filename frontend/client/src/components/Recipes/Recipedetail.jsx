
import { useState , useEffect } from "react";
import axios from "axios";
import "./details.scss";
import useApplicationData from "../../hooks/useApplicationData";
// import useApplicationData, { setRecipe } from "../../hooks/useApplicationData";

//this is the component responsible for handling data (recipes) received from api call. Create a useRecipeData hook to fetch the data (axios request)
//we will need onSubmit as a prop to handle recipe submit event. This could be a button in RecipeList

export default function RecipeDetail(props) {
  
const { setRecipe } = useApplicationData()

console.log("props from Recipedetail", props)
  let recipe_id = props.match.params.id
  const localId = localStorage.getItem("token");
  
  
  const [details, setDetails] = useState({ steps : [{'steps' : []}], info: { 'image' : '', extendedIngredients : [], time : 0, vegetarian: '', servings: '', name : ''}});
  
  
  useEffect(() => {
    if (recipe_id) {
      const APIKEY = process.env.API_KEY;
      const url = `https://api.spoonacular.com/recipes/${recipe_id}/analyzedInstructions?apiKey=f8973fa0549347b38d9ffd74077d423f&boolean=false`
      const url2 = `https://api.spoonacular.com/recipes/${recipe_id}/information?apiKey=f8973fa0549347b38d9ffd74077d423f&boolean=false`
      Promise.all([
        axios.get(url),
        axios.get(url2)
      ]).then((res) => {
        console.log(res)
        setDetails(prev => ({...prev, steps:res[0].data , info:res[1].data}));
        
      })
    }     
  }, [])
  
  
  let steps = details.steps[0]['steps']
  let name =  details.info['title']
  let img =  details.info['image']
  let ingredients =  details.info['extendedIngredients'].map(ingredients=> (<li> {ingredients['nameClean']}</li>))
  let time = details.info['readyInMinutes']
  let vegetarian = details.info['vegetarian']
  let servings = details.info['servings']
  
  const value = {
    recipie_name: name, 
    user_id: localId, 
    recipe_id: recipe_id
  }

  const EachStep= steps.map((step, index) => {return <li key={index}>{step.step}</li>})
  

  return (
    <section className='container'>
      <h1> Recipe Details</h1>
      < div className='top'>
        <img src={img} alt={"food image"}></img>
          <div style={{marginLeft:10 }}>
          <h2>Recipe Info</h2>
          <ul>
            <li>Time: {time} mins</li>
            <li>{vegetarian ? 'Vegetarian : No' :'Vegetarian : Yes'}</li>
            <li>Serves : {servings}</li>
          </ul>
      
          <h2>Ingredients needed</h2>
          <ul>
            {ingredients}
          </ul>
        </div>
      </div>
      <h2>Instructions</h2>
    <ul>
      {EachStep}
    </ul> 
    <button onClick={setRecipe(value)}>SAVE</button>
  </section>
  )
}