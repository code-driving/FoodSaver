import { React, Fragment}  from 'react'
import { Link } from 'react-router-dom';
import './NavBar.scss';
import logo from '../images/logo.png';

export default function NavBar(props) {
  const {updateSummary} = props
  return (
    <>
      <nav>
        <div>
          <img className="logo" src={logo} alt="Logo" />
        </div>
        <ul className="top_navigation">
          <li><Link to="/">products</Link></li>
          <li><Link to="/recipes">recipes</Link></li>
          <li><button onClick={() => {updateSummary()}} ><Link to="/summary">summary</Link></button></li>
          <li><Link to='/login'>login</Link></li>
          <li><Link to='/favourites'>favourites</Link></li>
        </ul>
      </nav>
    </>
  )
}
