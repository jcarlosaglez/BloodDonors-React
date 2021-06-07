import '../css/Home.css';
import './NavBarHome';
import NavBarHome from './NavBarHome';

const Home = () => {
	return(
		<header className="header-home">
			<div>
				<h1>
					Blood index
				</h1>
				<NavBarHome />
			</div>
		</header>
	)	
}

export default Home;