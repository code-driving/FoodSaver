import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useApplicationData from "../hooks/useApplicationData";
// import useRecipesApi from "../hooks/useRecipesApi";

import NavBar from "./NavBar";
import Products from "./Products";
import Recipes from "./Recipes";
import Summary from "./Summary";
import Login from "./Login";
import RecipesDetails from "./Recipes/Recipedetail";
import PrivateRoute from "./Login/PrivateRoute";
// require("dotenv").config();

export default function Application(props) {
  const { state, setProduct, deleteProduct } = useApplicationData();
  const [ingredientsItems, setIngredientsItems] = useState("");
  // console.log("recipes", state.recipes);
  // console.log("summary", state.summary);
  // console.log("products", state.products);
  const { products, recipes, summary, users } = state;
  // console.log(recipes)
  // console.log(summary)
  // console.log(products)
  console.log(process.env.REACT_APP_API_KEY);
  return (
    <main className="layout">
      <Router>
        {/* <div> */}
        <div>
          <NavBar />
        </div>
        <div className="right">
          <Switch>
            <PrivateRoute exact path="/">
              <Products
                products={products}
                setProduct={setProduct}
                deleteProduct={deleteProduct}
                setIngredientsItems={setIngredientsItems}
              />
            </PrivateRoute>

            <Route exact path="/recipes">
              <Recipes
                setIngredientsItems={setIngredientsItems}
                ingredientsItems={ingredientsItems}
              />
            </Route>

            <Route exact path="/recipes/:id" component={RecipesDetails}></Route>

            <Route exact path="/summary">
              <Summary />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            {/* <Route path="*">
            <h1>404 - Not Found</h1>
          </Route> */}
          </Switch>
        </div>
        {/* </div> */}
      </Router>
    </main>
  );
}
