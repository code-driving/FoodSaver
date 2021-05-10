import React from 'react'
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
      <nav>
        <ul>
          <li><Link to="/">products</Link></li>
          <li><Link to="/recipes">recipes</Link></li>
          <li><Link to="/summaries">summary</Link></li>
          <li><Link to='/login'>login</Link></li>
        </ul>
      </nav>
  )
}
