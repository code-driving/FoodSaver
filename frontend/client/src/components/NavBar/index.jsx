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
          <li><button className="link_button"><Link to="/">products</Link></button></li>
          <li><button className="link_button"><Link to="/recipes">recipes</Link></button></li>
          <li><button className="link_button" onClick={() => {updateSummary()}} ><Link to="/summary">summary</Link></button></li>
          <li><button className="link_button"><Link to="/login">login</Link></button></li>
          <li><button className="link_button"><Link to="/favourites">favourites</Link></button></li>
        </ul>
      </nav>
    </>
  )
}
