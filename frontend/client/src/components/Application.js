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
import Favourites from "./Favourites";
import RecipesDetails from "./Recipes/Recipedetail";
import PrivateRoute from "./Login/PrivateRoute";

export default function Application(props) {
  const {
    state,
    setProduct,
    deleteProduct,
    setRecipe,
    deleteRecipe,
    consumeProduct,
    EditProduct,
    EditSummary,
  } = useApplicationData();
  const [ingredientsItems, setIngredientsItems] = useState("");
  const { products, recipes, summary, users } = state;

  return (
    <main className="layout">
      <Router>
        {/* <div> */}
        <div className="left">
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
                consumeProduct={consumeProduct}
                EditProduct={EditProduct}
                EditSummary={EditSummary}
              />
            </PrivateRoute>

            <Route exact path="/recipes">
              <Recipes
                setIngredientsItems={setIngredientsItems}
                ingredientsItems={ingredientsItems}
              />
            </Route>

            <Route exact path="/recipes/:id">
              <RecipesDetails setRecipe={setRecipe} />
            </Route>

            {/* <Route exact path="/recipes/:id" component={RecipesDetails}></Route> */}

            {/* <Route exact path="/details/:id" render={(props)=>{
            <RecipesDetails id={props.match.params.id}/>
          }} /> */}
            <Route exact path="/summary">
              <Summary />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/favourites">
              <Favourites recipes={recipes} deleteRecipe={deleteRecipe} />
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
