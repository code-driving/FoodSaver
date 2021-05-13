import useRecipeDetails from '../../hooks/useRecipeDetails'
import { useState , useEffect } from "react";
import axios from "axios";


//this is the component responsible for handling data (recipes) received from api call. Create a useRecipeData hook to fetch the data (axios request)
//we will need onSubmit as a prop to handle recipe submit event. This could be a button in RecipeList

export default function RecipeDetail(props) {

  let recipe_id = props.match.params.id

  const [details, setDetails] = useState({ steps : [{'steps' : []}], info: { 'image' : ''}});
  
 
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
  let img =  details.info['image']

  const EachStep= steps.map((step, index) => {return <li key={index}>{step.step}</li>})
  

  return (
    <section>
     Details
     <img src={img} alt={"food image"}></img>
    <ul>
      <li>test</li>
      {EachStep}
    </ul> 
   </section>
  )
}