import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../css/App.css";
import Home from "./Home.js";
import AccessPanel from "./AccessPanel";
import Information from "./Information.js";
import Footer from "./Footer";

export default function App() {
	return (
		<Router>
			{/* Las rutas van en sentido inverso de prioridad */}
			<Switch>
				<Route path="/paneluser">
					<AccessPanel />
				</Route>
				<Route path="/inf">
					<Information />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
			<Footer />
		</Router>
	);
}
