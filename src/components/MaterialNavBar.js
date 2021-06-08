import React from 'react';
import { NavLink } from "react-router-dom";
import "../css/NavBarApp.css";

export default function NavBarApp() {

  return (
	<>	
		<nav className="NavBarApp">
			<ul>
				<li><NavLink exact to="/" activeClassName="active"> Home </NavLink></li>
				<li><NavLink exact to="/informacion" activeClassName="active"> Informacion </NavLink></li>
				<li><NavLink exact to="/informacion/requisitos" activeClassName="active"> Requisitos </NavLink></li>
				<li><NavLink exact to="/informacion/nosotros" activeClassName="active"> Nosotros </NavLink></li>
			</ul>
		</nav>
	</>
  );
}