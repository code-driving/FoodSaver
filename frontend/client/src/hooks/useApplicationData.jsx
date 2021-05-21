import { useState, useEffect } from "react";
import axios from "axios";
import datefunction from "../helpers/date";
import CalculateScoreInc from "../helpers/calculateScoreInc";
import CalculateScoreDec from "../helpers/CalculateScoreDec";
import editSingleProductState from "../helpers/editsingleproduct"

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
      
      //update Summary State
      let newstate2 = []
      for (let j=0; j < state.summary.length; j++) {
        if (state.summary[j]['product_id']!= productID) {
          newstate2.push(state.summary[j]);
        }
      }
      let newcombined =[...newstate2,res['data'][0]]
      setState((prev) => ({ ...prev, summary: newcombined }));
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
  
  };

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
  // update summary on expirting stuff
    if (state.users.length > 0) {
      let IdAndScore = CalculateScoreDec(state['products'],state['users'][0]['score'])
      let userdata={ score:IdAndScore.newScore, user_id:localId}
      updateUser(userdata)
      let productIDs=IdAndScore.setTrue

      let summaryobject =IdAndScore.objectarray;

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
           editSingleProductState({data : [summaryobject[k]]},state,setState)
        }
      })
      
      // Add wasted to summary
      let returndata2 = [];
      let promises2 = [];
      for (let j = 0; j < productIDs.length ; j++){
        promises2.push(axios.put(`/api/summary/waste`, summaryobject[j] ).then((res2) => {
          returndata2.push(res2);
         })
       )  
      }

      Promise.all(promises2).then(() => { 
        // update waste summarystate
        if(returndata2.length>0){
        let productID = returndata2[0]['data'][0]['product_id']
        let newstate2 = []
        for (let k=0; k < state.summary.length; k++) {
          if (state.summary[k]['product_id']!= productID) {
            newstate2.push(state.summary[k]);
          }
        }
        let newcombined =[...newstate2, returndata2[0]['data'][0]]
        setState((prev) => ({ ...prev, summary: newcombined }));
       }
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
}
