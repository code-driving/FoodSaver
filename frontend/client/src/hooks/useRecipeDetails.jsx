import { useState, useEffect } from "react";
import axios from "axios";

export default function useRecipesDetailsApi(recipe_id) {
  const [details, setDetails] = useState();
  
 
  useEffect(() => {
    if (recipe_id) {
      const APIKEY = process.env.API_KEY;
      const url = `https://api.spoonacular.com/recipes/${recipe_id}/analyzedInstructions?apiKey=f8973fa0549347b38d9ffd74077d423f&boolean=false`
      axios
        .get(url)
        .then(res =>  setDetails(res.data))
      
    }
  }, [recipe_id])

  return  details 
}


//<input type="button" disabled={sendRequest} onClick={() => setDetails(true)}

