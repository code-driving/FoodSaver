import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import NavBar from "./NavBar/NavBarItem"
import ProductList from "./Products/ProductList"
import RecipeList from "./Recipes/RecipeList"
import SummaryList from "./Summary/SummaryList"


export default function Application(props) {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <ProductList />
          </Route>
          <Route path="/recipes">
            <RecipeList />
          </Route>
          <Route path="/quantities">
            <SummaryList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

