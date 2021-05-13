import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useApplicationData from "../hooks/useApplicationData";
// import useRecipesApi from "../hooks/useRecipesApi";

import NavBar from "./NavBar";
import Products from "./Products";
import Recipes from "./Recipes";
import Summary from "./Summary";
import Login from "./Login";
import Favourites from "./Favourites";
import RecipesDetails from "./Recipes/Recipedetail"
import PrivateRoute from "./Login/PrivateRoute";

export default function Application(props) {
  const { state, setProduct, deleteProduct, setRecipe, deleteRecipe } = useApplicationData();
  // console.log("recipes", state.recipes);
  // console.log("summary", state.summary);
  // console.log("products", state.products);
  const { products, recipes, summary, users } = state
  // console.log(recipes)
  // console.log(summary)
  // console.log(products)
  return (
    <main className="layout">
      <Router>
        {/* <div> */}
        <div>
          <NavBar />
        </div>
        <div className='right'>
        <Switch>
          <PrivateRoute exact path="/">
            <Products products={products} setProduct={setProduct} deleteProduct={deleteProduct} />
          </PrivateRoute>

          <Route exact path="/recipes">
            <Recipes />
          </Route>

          <Route exact path="/recipes/:id" component={RecipesDetails} setRecipe={setRecipe}>
          </Route>
          
          {/* <Route path="/recipes/:id" exact render={(props) => (<RecipesDetails setRecipe={setRecipe} {...props}/>)} /> */}
          
          <Route exact path="/summary">
            <Summary />
          </Route>

          <Route path="/login">
            <Login />
          </Route>
          
          <Route path="/favourites">
            <Favourites recipes={recipes} deleteRecipe={deleteRecipe}/>
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
