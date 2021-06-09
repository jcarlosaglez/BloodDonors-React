import { BrowserRouter as Router} from "react-router-dom";
import "../css/App.css";
import AuthProvider from "./Auth/AuthProvider";

import Routes from "./Routes/Routes";
import MaterialNavBar from "./NavBarApp";
import Footer from "./Footer";

export default function App() {
	return (
		<AuthProvider >
			<Router>
				<div>
					<MaterialNavBar />
				</div>

				<Routes />
				<Footer />
			</Router>
		</AuthProvider>
	);
}
