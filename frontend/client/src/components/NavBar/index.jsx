import { React, Fragment}  from 'react'
import { Link } from 'react-router-dom';
import './NavBar.scss';

export default function NavBar() {
  return (
    <>
      <nav>
        <ul className="top_navigation">
          <li><Link to="/">products</Link></li>
          <li><Link to="/recipes">recipes</Link></li>
          <li><Link to="/summary">summary</Link></li>
          <li><Link to='/login'>login</Link></li>
          <li><Link to='/favourites'>favourites</Link></li>
        </ul>
      </nav>
    </>
  )
}
