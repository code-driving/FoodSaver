import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

<<<<<<< HEAD
import NavBar from "./NavBar/NavBarItem"
import ProductList from "./Products/ProductList"
import RecipeList from "./Recipes/RecipeList"
import SummaryList from "./Summary/SummaryList"
=======
import NavBar from "./NavBar"
import Products from "./Products"
import Recipes from "./Recipes"
import Summary from "./Summary"
import Login from "./Login"
import PrivateRoute from "./Login/PrivateRoute"
>>>>>>> 6c0341075e61592c2e7f4dda8902cd17379a5b30


export default function Application(props) {
  return (
<<<<<<< HEAD
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
=======
    <main className="layout">
    <Router>
      {/* <div> */}
        <NavBar />
        <Switch>
        
          <PrivateRoute exact path="/">
            <Products />
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
>>>>>>> 6c0341075e61592c2e7f4dda8902cd17379a5b30
  );
}

