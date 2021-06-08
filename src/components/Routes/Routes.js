import { Switch, Route} from "react-router-dom";
import Home from "../Home.js";
import PrivateRoutes from "./PrivateRoutes";
import AccessPanel from "../AccessPanel";

import Information from "../Information/Home";
import Requisitos from "../Information/Information";
import AboutUs from "../Information/AboutUs";

import NoFound from "../NoFound";

const Routes = () => {

    return(
    <Switch>

        <PrivateRoutes exact path="/paneluser" component={AccessPanel} />
        {/* Información estatica */}
        <Route exact path="/informacion/nosotros" component={AboutUs} />
        <Route exact path="/informacion/requisitos" component={Requisitos} />
        <Route exact path="/informacion" component={Information} />

        {/* Home */}
        <Route exact path="/">
            <Home />
        </Route>

        {/* Error 404 */}
        <Route path="*" component={NoFound} />
    </Switch>
    );
}

export default Routes
