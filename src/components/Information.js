import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";
import Home from "./Information/Home";
import Inf from "./Information/Information";
import AboutUs from "./Information/AboutUs";
const Information = () => {
    let { path } = useRouteMatch();

    return (
        <Router>
			{/* Las rutas van en sentido inverso de prioridad */}
			<Switch> 
				<Route path="informacion/nosotros" >
					<AboutUs />
				</Route>
				<Route path={`${path}/requisitos`}>
					<Inf />
				</Route> 
				<Route exact path={path}>
					<Home />
				</Route>
			</Switch>
		</Router>
    )
}
export default Information;