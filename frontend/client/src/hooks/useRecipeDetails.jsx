import { useState, useEffect } from "react";
import axios from "axios";

export default function useRecipesDetailsApi(recipe_id) {
  const [details, setDetails] = useState();

  useEffect(() => {
    if (recipe_id) {
      const APIKEY = process.env.API_KEY;
      const url = `https://api.spoonacular.com/recipes/${recipe_id}/analyzedInstructions?apiKey=fe944c0a7ca548aa96c6ac698fdbdf91&boolean=false`;
      axios.get(url).then((res) => setDetails(res.data));
    }
  }, [recipe_id]);

  return details;
}

//<input type="button" disabled={sendRequest} onClick={() => setDetails(true)}
