import {Link} from 'react-router-dom';
import '../css/NavBarHome.css'

function NavBarHome(){
	return(
	<div>
		<nav className="navbarhome">
			<ul>
				<li>
					<Link className="link linkHome" to="/">Home</Link>
				</li>
				<li>
					<Link className="link linkHome" to="/inf/">Información</Link>
				</li>
				<li>
					<Link className="link linkHome" to="/inf/requisitos">Requisitos</Link>
				</li>
				<li>
					<Link className="link linkHome" to="/inf/nosotros">Nosotros</Link>
				</li>
			</ul>
		</nav>
	</div>
	)
}
export default NavBarHome;