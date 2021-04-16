import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import '../css/App.css';
import Home from './Home.js';
import About from './About.js';
import Users from './Users.js';

export default function App() {
  const navLinkClass = "inline-block p-2 my-1 ml-10 rounded hover:bg-red-200 text-white font-black";
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
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* Las rutas van en sentido inverso de prioridad */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


