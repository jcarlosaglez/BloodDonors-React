import React from 'react';
import { NavLink, Link } from "react-router-dom";
import {useState} from "react";
import useAuth from "./Auth/useAuth";
import "../css/NavBarApp.css";

import MenuIcon from '@material-ui/icons/Menu';

export default function NavBarApp() {
	const [activ, useActiv] = useState(false);
	const Update = () => {
		useActiv(!activ);
		console.log(activ);
	};
	const auth = useAuth();
  	return (
		<>	
			<nav className="NavBarApp">
				<div className="IconMenu" onClick={Update}>
					<MenuIcon />
				</div>
				<Link to="/" className="nameApp"> Blood Index </Link>
				<ul className={activ? "visible" : "hiden"}>
					<li><NavLink exact to="/" activeClassName="active"> Home </NavLink></li>
					<li><NavLink exact to="/informacion" activeClassName="active"> Informacion </NavLink></li>
					<li><NavLink exact to="/informacion/requisitos" activeClassName="active"> Requisitos </NavLink></li>
					<li><NavLink exact to="/informacion/nosotros" activeClassName="active"> Nosotros </NavLink></li>
					{auth.isLogged() && 
						<li><NavLink to="/panel" activeClassName="active"> Panel de usuario </NavLink></li>
					}
				</ul>
				<div>
					{!auth.isLogged() && 
                    	<div className="containerButton">
							<Link to="/signin" className="button-nav">Sign in</Link>
							<Link to="/login" className="button-nav">Login</Link>
						</div>
					}
                	{auth.isLogged() && 
						<div className="containerButton" onClick={() => auth.logout()}>
							<button className="button-nav">Cerrar sesión</button>
						</div>
					}
				</div>
			</nav>
		</>
  );
}
