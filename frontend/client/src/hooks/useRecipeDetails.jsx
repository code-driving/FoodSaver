import { useState, useEffect } from "react";
import axios from "axios";

export default function useRecipesDetailsApi(recipe_id) {
  const [details, setDetails] = useState();
  
 
  useEffect(() => {
    if (product) {
      const APIKEY = process.ENV.API_KEY;
      const url = `https://api.spoonacular.com/recipes/${recipe_id}/analyzedInstructions?apiKey=${APIKEY}&boolean=false`
      axios
        .get(url)
        .then(res =>  setProduct(res.data))
    }
  }, [details])

  return { details }
}


//<input type="button" disabled={sendRequest} onClick={() => setDetails(true)}

