import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import datefunction from "../helpers/date";

export default function useApplicationData() {
  const [state, setState] = useState({
    users: [],
    products: [],
    recipes: [],
    summary: [],
    //keep track of the expired and saved products
    // score: 100
  });

  const localId = localStorage.getItem("token");

  const setProduct = (value) => {
    return axios.post(`/api/products/`, value).then((response) => {
      const dateData = datefunction([response.data]);
      console.log('from add pppppppppppppppppppp',response.data)
      const parseddata = dateData[0];
      const combined = {
        ...response.data,
        expiration: parseddata.expiration,
        dayLeft: parseddata.dayLeft,
      };
      setState((prev) => ({ ...prev, products: [...prev.products, combined] }));
    });
  };

  const EditProduct = (value) => {
    return axios.put(`/api/products`, value).then((res) => {
      const product_id =res['data'][0]['id']
      const dateData = datefunction([res['data'][0]]);
      const parseddata = dateData[0];

      const combined = {
        ...res['data'][0],
        expiration: parseddata.expiration,
        dayLeft: parseddata.dayLeft,
      };

      let deletedState =[];
      
      for (let i = 0; i < state.products.length ; i++) {
        if(state.products[i]['id'] != product_id ){
          deletedState.push(state.products[i])
        }
      }
    const combinedState = [...deletedState, combined ]
      setState((prev) => ({ ...prev, products: combinedState }));
        
    });
  };

  const EditSummary = (value) => {
    //------For Consume
    // return axios.post(`/api/products/`, value).then((response) => {
    //   const dateData = datefunction([response.data]);
    //   const parseddata = dateData[0];
    //   const combined = {
    //     ...response.data,
    //     expiration: parseddata.expiration,
    //     dayLeft: parseddata.dayLeft,
    //   };
    //   setState((prev) => ({ ...prev, products: [...prev.products, combined] }));
    // });
  };


  const deleteProduct = (ids) => {
    const deletes = [];
    for (const id of ids) {
      deletes.push(axios.delete(`/api/products/${id}`));
    }
    Promise.all(deletes).then((res) => {
      const del = state.products.filter((product) => !ids.includes(product.id));
      setState((prev) => ({ ...prev, products: del }));
    });
  };

  const setRecipe = (value) => {
    return axios
      .post(`/api/recipes/`, value)
      .then((response) => {
        const append = response.data
        setState(prev => ({ ...prev, recipes: [...prev.recipes, response.data] }))
  
    });
  };

  const deleteRecipe = (id) => {
    return axios.delete(`/api/recipes/${id}`).then((res) => {
      console.log("id from delete", id);

      let newstate = [];

      for (let i = 0; i < state.recipes.length; i++) {
        if (state.recipes[i].recipe_id != id) {
          newstate.push(state.recipes[i]);
        }
      }

      setState((prev) => ({ ...prev, recipes: newstate }));
    });
  };

  const consumeProduct = (id) => {
    console.log("product consumed", id);
  };

  //We should not use localId at the end of each endpoint!
  useEffect(() => {
    Promise.all([
      axios.get(`/api/users`),
      axios.get(`/api/products/${localId}`),
      axios.get(`/api/recipes/${localId}`),
      axios.get(`/api/summary`),
    ]).then(([users, products, recipes, summary]) => {
      const dateData = datefunction(products.data);
      for (let i = 0; i < products.data.length; i++) {
        products.data[i]["expiration"] = dateData[i]["expiration"];
        products.data[i]["dayLeft"] = dateData[i]["dayLeft"];
      }

      setState((prev) => ({
        ...prev,
        users: users.data,
        products: products.data,
        recipes: recipes.data,
        summary: summary.data,
      }));
    });
  }, []);

  return {
    state,
    setProduct,
    deleteProduct,
    setRecipe,
    deleteRecipe,
    consumeProduct,
    EditProduct,
    EditSummary
  };

  //6. create handleIncrement, handleDecrement, handleReset to update the score based on the product_saved, product_expired
  //IF SCORE == 0 THEN HE WILL HAVE TO DONATE TO FOODBANK AND HAVE A POSSIBILITY TO RESET A SCORE
}
