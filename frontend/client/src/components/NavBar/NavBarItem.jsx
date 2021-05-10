import React from 'react'
import { Link } from 'react-router-dom';


export default function NavBarItem() {
  return (
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
    </div>
  )
}
