import {Route, Redirect} from "react-router-dom";
import useAuth from "../Auth/useAuth";

const PublicRoutes = ({component: Component}, ...rest) => {
    const auth = useAuth();

    return(
        <Route {...rest}>{!auth.isLogged() ? <Component /> : <Redirect to="/panel/user" />}</Route>
    );
}
export default PublicRoutes;