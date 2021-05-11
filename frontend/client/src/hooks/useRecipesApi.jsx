import { useState, useEffect } from "react";
import axios from "axios";
import ingredientsToString from "../helpers/ingredientsToString"

export default function useRecipesApi(product, ingredientsArray) {
  const [product, setProduct] = useState(product);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ingredients = ingredientsToString(ingredientsArray)
 
  useEffect(() => {
    if (product) {
      const APIKEY = process.ENV.API_KEY;
      const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${APIKEY}&ingredients=${ingredients}&number=5`
      axios
        .get(url)
        .then(res =>  setProduct(res.data))
    }
  }, [product])

  return { product }
}
