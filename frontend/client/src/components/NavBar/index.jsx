import React from 'react'
import { Link } from 'react-router-dom';


export default function NavBar() {
  return (
      <nav>
        <ul>
          <li><Link to="/">Products</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/summaries">Summary</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
      </nav>
  )
}
