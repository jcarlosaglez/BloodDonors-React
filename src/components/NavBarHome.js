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
					<Link className="link linkHome" to="/informacion/">Información</Link>
				</li>
				<li>
					<Link className="link linkHome" to="/informacion/requisitos">Requisitos</Link>
				</li>
				<li>
					<Link className="link linkHome" to="/informacion/nosotros">Nosotros</Link>
				</li>
			</ul>
		</nav>
	</div>
	)
}
export default NavBarHome;