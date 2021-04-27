import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import '../css/App.css';
import Home from './Home.js';
import About from './About.js';
import Inf from './Inf.js';
import NavBar from './NavBar';
import Signin from './Signin';
import SigninDonor from './SigninDonor';
import Login from './Login';

export default function App() {
  return (
    <Router>
      <div className="w-full">
        {/*
        <nav className="fixed top-0 bg-red-500 w-full ">
          <ul className="inline-block">
            <li className={navLinkClass}>
              <Link to="/">Home</Link>
            </li>
            <li className={navLinkClass}>
              <Link to="/about">About</Link>
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
        </nav> */}
        <NavBar />

        {/* Las rutas van en sentido inverso de prioridad */}
        <Switch>
          <Route path="/LogIn">
            <Login />
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


