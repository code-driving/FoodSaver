import { useState, useEffect } from "react";
import axios from "axios";

export default function useRecipesDetailsApi(recipe_id) {
  const [details, setDetails] = useState({ steps : [], info:[]});
  
 
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
  }, [recipe_id])
  
  return  details 
}

