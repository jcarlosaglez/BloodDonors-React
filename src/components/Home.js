import '../css/Home.css';
import './NavBarHome';
import NavBarHome from './NavBarHome';
import useAuth from "./Auth/useAuth";

const Home = () => {
	const auth = useAuth();
	return(
		<header className="header-home">
			<div>
				<h1>
					Blood index
				</h1>
				{!auth.isLogged() && 
					<>
						<button>Iniciar sesión</button>
						<button>Registrarse</button>
					</>
				}
				{auth.isLogged() && 
					<>
						<button>Panel de control</button>
					</>
				}
				<NavBarHome />
			</div>
		</header>
	)	
}

export default Home;