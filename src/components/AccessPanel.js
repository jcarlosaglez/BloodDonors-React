import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";
import React from "react";

//Routes
import Donor from "./DonorsList";
import Home from "./AccessPanel/Home";

function PanelUser() {
    let { path } = useRouteMatch();

	return (
        <Router>
            <Switch>
                <Route path={`${path}/donors`}>
                    <Donor />
                </Route> 
				<Route exact path={path}>
					<Home />
				</Route>
			</Switch>
        </Router>
	);
}
export default PanelUser;