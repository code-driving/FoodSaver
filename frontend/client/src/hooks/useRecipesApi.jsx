import { useState, useEffect } from "react";
import axios from "axios";

export default function useRecipesApi(ingredients) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (ingredients) {
      console.log(ingredients);

      const APIKEY = process.env.API_KEY;
      console.log(APIKEY);
      const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=f8973fa0549347b38d9ffd74077d423f&ingredients=${ingredients}&number=5`;
      axios.get(url).then((res) => {
        setRecipe(res.data);
        console.log(res);
      });
    }
  }, [ingredients]);

  return recipe;
}
