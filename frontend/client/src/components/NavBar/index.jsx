import React from 'react'
import { Link } from 'react-router-dom';
import './NavBar.scss';

export default function NavBar() {
  return (
      <nav>
        <ul>
          <li><Link to="/">products</Link></li>
          <li><Link to="/recipes">recipes</Link></li>
          <li><Link to="/summary">summary</Link></li>
          <li><Link to='/login'>login</Link></li>
        </ul>
      </nav>
  )
}
