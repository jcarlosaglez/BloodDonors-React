import '../css/NavBar.css';
import {
    Link
  } from "react-router-dom";

const NavBar = () => 
    <nav className="fixed top-0 bg-red-500 w-full ">
        <ul className="inline-block">
            <li className="link">
                <Link to="/">Home</Link>
            </li>
            <li className="link">
                <Link to="/about">About</Link>
            </li>
            <li className="link">
                <Link to="/inf">Información</Link>
            </li>
        </ul>
    </nav> 


export default NavBar();