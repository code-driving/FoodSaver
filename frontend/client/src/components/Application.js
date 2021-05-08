import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function Application(props) {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/recipes">Recipes</Link>
            </li>
            <li>
              <Link to="/quantities">Summary</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/recipes">
            <Recipes />
          </Route>
          <Route path="/quantities">
            <Quantities />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Products() {
  return <h2>Home page with all products</h2>;
}

function Recipes() {
  return <h2>Recipes</h2>;
}

function Quantities() {
  return <h2>Quantities</h2>;
}
