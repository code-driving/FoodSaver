import { useState, useEffect } from "react";
import axios from "axios";

export default function useRecipesApi(product) {
  const [product, setProduct] = useState(product);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      const APIKEY = process.ENV.API_KEY;
      const url = 
    }
  });
}
