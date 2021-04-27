import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import '../css/App.css';
import Home from './Home.js';
import About from './About.js';
import Inf from './Inf.js';
import Signin from './Signin';
import SigninDonor from './SigninDonor';
import Login from './Login';
import DonorsList from "./DonorsList";
import Donor from "./Donor";

export default function App() {
  const navLinkClass = "inline-block p-2 my-1 ml-10 rounded hover:bg-red-200 text-white hover:text-red-500 font-black";
  return (
    <Router>
      <div className="w-full">
        <nav className="fixed top-0 bg-red-500 w-full ">
          <ul className="inline-block">
            <li className={navLinkClass}>
              <Link to="/">Home</Link>
            </li>
            <li className={navLinkClass}>
              <Link to="/about">About</Link>
            </li>
            <li className={navLinkClass}>
              <Link to="/donors">Donadores</Link>
            </li>
            <li className={navLinkClass}>
              <Link to="/inf">Información</Link>
            </li>
            <li className={navLinkClass}>
              <Link to="/LogIn">Login</Link>
            </li>
            <li className={navLinkClass}>
              <Link to="/SignIn">Signin</Link>
            </li>
          </ul>
        </nav>

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
          <Route path="/SignIn">
            <Signin />
          </Route>
          <Route path="/SignInDonor">
            <SigninDonor />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/inf">
            <Inf />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


