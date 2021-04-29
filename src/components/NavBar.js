// import '../css/NavBar.css';
import {
    Link
  } from "react-router-dom";

const NavBar = () => 
    <nav className="navbar">
        <ul className="">
            <li className="link">
              <Link to="/">Home</Link>
            </li>
            <li className="link">
              <Link to="/about">About</Link>
            </li>
            <li className="link">
              <Link to="/donors">Donadores</Link>
            </li>
            <li className="link">
              <Link to="/inf">Información</Link>
            </li>
            <li className="link">
              <Link to="/LogIn">Login</Link>
            </li>
            <li className="link">
              <Link to="/SignIn">Signin</Link>
            </li>
        </ul>
    </nav> 


export default NavBar;