import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import datefunction from "../helpers/date";
import CalculateScoreInc from "../helpers/calculateScoreInc";
import CalculateScoreDec from "../helpers/CalculateScoreDec";
import editSingleProductState from "../helpers/editsingleproduct"
import { startOfYesterday } from "date-fns/esm";



export default function useApplicationData() {
  const [state, setState] = useState({
    users: [],
    products: [],
    recipes: [],
    summary: [],
   
  });

  const localId = localStorage.getItem("token");

  const setProduct = (value) => {
    return axios.post(`/api/products/`, value).then((response) => {
      const dateData = datefunction([response.data]);
      const parseddata = dateData[0];
      const combined = {
        ...response.data,
        expiration: parseddata.expiration,
        dayLeft: parseddata.dayLeft,
      };
      setState((prev) => ({ ...prev, products: [...prev.products, combined] }));
      
      let product_id = response.data.id;
      let value2 = {...value, product_id:product_id}
      return axios.post(`/api/summary/`, value2).then((response) => {
          console.log('addddd res', response.data[0])
          setState((prev) => ({ ...prev, summary:[...prev.summary, response.data[0]]}))
      })
    });
  };

  const updateUser = (value) => {
    return axios.put(`/api/users/`,value).then((res) => {
     let data = res['data'][0];
      setState((prev) => ({ ...prev, users: [data] }));
    })
  };

  const EditProduct = (value) => {
   
    return axios.put(`/api/products`, value).then((res) => {
      console.log('22222222222221111',res)
      editSingleProductState(res,state,setState)
    });
  };

  const EditSummary = (value) => {
      const productID=value.product_id
      let StateToChange = {}

      for (let i=0; i<state.products.length;i++){
        if(state.products[i]['id']=== productID){
          StateToChange = state.products[i]
        }
      }
      let QuantityG = StateToChange.quantity_grams
      let QuantityU= StateToChange.quantity_units 
      let newstate = {}
      if(QuantityG != 0 ){
          newstate = {...StateToChange, quantity_grams: (QuantityG - value.quantity_grams) ,product_id:productID};
      } else {
          newstate = {...StateToChange, quantity_units: (QuantityU -value.quantity_units) , product_id:productID};
          
      }

     return axios.put(`/api/summary/`, value).then((res) => {
      EditProduct(newstate)
    
      const newScore = CalculateScoreInc(state.users[0]['score'],value.quantity_units,value.quantity_grams)
      const data = {score :newScore, user_id : localId} 
      updateUser(data)
    });
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
    return axios.post(`/api/recipes/`, value).then((response) => {
      setState((prev) => ({
        ...prev,
        recipes: [...prev.recipes, response.data[0]],
      }));
    });
  };

  const deleteRecipe = (id) => {
    return axios.delete(`/api/recipes/${id}`).then((res) => {
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
      axios.get(`/api/users/${localId}`),
      axios.get(`/api/products/${localId}`),
      axios.get(`/api/recipes/${localId}`),
      axios.get(`/api/summary/${localId}`),
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
      }))
    })
  }, []);

  
const updateSummary = (id) => {
    if (state.users.length > 0) {
      let IdAndScore = CalculateScoreDec(state['products'],state['users'][0]['score'])
      console.log(IdAndScore)
      let userdata={ score:IdAndScore.newScore, user_id:localId}
      updateUser(userdata)
      let productIDs=IdAndScore.setTrue


      let summaryobject =IdAndScore.objectarray;
      console.log('888888888',summaryobject)

      //Run Request in parallel and marks as added to summary true
      let returndata = [];
      let promises = [];
      for (let i = 0; i < productIDs.length ; i++){
        promises.push(axios.put(`/api/products/Boolean`, {product_id:productIDs[i]} ).then((res) => {
          returndata.push(res);
         })
       )  
      }

      Promise.all(promises).then(() => { 
        //update state
        for (let k = 0; k < productIDs.length ; k++){
          let combinedState = editSingleProductState({data : [summaryobject[k]]},state,setState)
        }
      })
      
      // Add wasted to summary
     

      let returndata2 = [];
      let promises2 = [];
      for (let j = 0; j < productIDs.length ; j++){
        console.log('00000000000000000',summaryobject[j])
        promises2.push(axios.put(`/api/summary/waste`, summaryobject[j] ).then((res2) => {
          returndata2.push(res2);
         })
       )  
      }
      Promise.all(promises2).then(() => { 
        console.log('888777777777',promises2)

      })
    
    }
  };
  
  return {
    state,
    setProduct,
    deleteProduct,
    setRecipe,
    deleteRecipe,
    consumeProduct,
    EditProduct,
    EditSummary,
    updateUser,
    updateSummary
  };




  //6. create handleIncrement, handleDecrement, handleReset to update the score based on the product_saved, product_expired
  //IF SCORE == 0 THEN HE WILL HAVE TO DONATE TO FOODBANK AND HAVE A POSSIBILITY TO RESET A SCORE
}
