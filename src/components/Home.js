import '../css/Home.css';
import './NavBarHome';
import NavBarHome from './NavBarHome';
import useAuth from "./Auth/useAuth";
import {Link} from "react-router-dom";
import "../css/HeaderGeneral.css"

const Home = () => {
	const auth = useAuth();
	return(
		<header className="header-home">
			<div>
				<h1>
					Blood index
				</h1>
				{!auth.isLogged() && 
                	<div className="containerButton">
						<Link to="/signin" className="button">Registrarse</Link>
						<Link to="/login" className="button">Iniciar sesión</Link>
					</div>
				}
				{auth.isLogged() && 
					<div className="containerButton" onClick={() => auth.logout()}>
						<button className="button">Cerrar sesión</button>
					</div>
				}
				<NavBarHome />
			</div>
		</header>
	)	
}

export default Home;