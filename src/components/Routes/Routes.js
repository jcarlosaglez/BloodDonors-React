import { Switch, Route} from "react-router-dom";
import Home from "../Home.js";

import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

import Login from "../Login";
import Signin from "../SigninDonor"; 
import AccessPanel from "../AccessPanel";
import RequestDonor from "../AccessPanel/RequestDonor.js";
import ContactDonor from "../AccessPanel/ContactDonor.js";
import User from "../AccessPanel/User";

import Information from "../Information/Home";
import Requisitos from "../Information/Information";
import AboutUs from "../Information/AboutUs";

import NoFound from "../NoFound";


const Routes = () => {

    return(
    <Switch>
        <PrivateRoutes exact path="/panel/user" component={User} />
        <PrivateRoutes exact path="panel/contacto" component={ContactDonor} />
        <PrivateRoutes exact path="panel/solicitud" component={RequestDonor} />
        <PrivateRoutes exact path="/panel" component={AccessPanel} /> 

        <PublicRoutes exact path="/login" component={Login} />
        <PublicRoutes exact path="/signin" component={Signin} />
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
