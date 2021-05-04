import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../css/App.css";
import Home from "./Home.js";
import AboutUs from "./AboutUs.js";
import Information from "./Information.js";
import Signin from "./Signin";
import SigninDonor from "./SigninDonor.js";
import Login from "./Login";
import Footer from "./Footer";
import DonorsList from "./DonorsList";
import Donor from "./Donor";
import PanelUser from "./PanelUser";

import ButtonAppBar from "./MaterialNavBar";

export default function App() {
	return (
		<Router>
			<ButtonAppBar />
			{/* Las rutas van en sentido inverso de prioridad */}
			<Switch>
				<Route path="/LogIn">
					<Login />
				</Route>
				<Route path="/donors/:id">
					<Donor />
				</Route>
				<Route path="/donors">
					<DonorsList />
				</Route>
				<Route path="/panelUser">
					<PanelUser />
				</Route>
				<Route path="/SignIn">
					<Signin />
				</Route>
				<Route path="/SignInDonor">
					<SigninDonor />
				</Route>
				<Route path="/about">
					<AboutUs />
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
