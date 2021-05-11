import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useApplicationData from "../hooks/useApplicationData";
import useRecipesApi from "../hooks/useRecipesApi";

import NavBar from "./NavBar";
import Products from "./Products";
import Recipes from "./Recipes";
import Summary from "./Summary";
import Login from "./Login";
import PrivateRoute from "./Login/PrivateRoute";

export default function Application(props) {
  const { state, createProduct } = useApplicationData();
  // const { useRecipesApi } = useRecipesApi();
  console.log("recipes", state.recipes);
  console.log("summary", state.summary);
  console.log("products", state.products[0]);
  return (
    <main className="layout">
      <Router>
        {/* <div> */}
        <NavBar />
        <Switch>
          <PrivateRoute exact path="/">
            <Products onSubmit={createProduct} products={state.products} />
          </PrivateRoute>

          <Route exact path="/recipes">
            <Recipes />
          </Route>

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
        {/* </div> */}
      </Router>
    </main>
  );
}
