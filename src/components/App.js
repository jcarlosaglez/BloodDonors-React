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
  return (
    <Router>
      <div>
        <nav>
          <ul className="inline-block">
            <li className="inline-block p-2 my-1 ml-10 rounded hover:bg-blue-300 hover:text-white">
              <Link to="/">Home</Link>
            </li>
            <li className="inline-block p-2 mx-10 rounded hover:bg-blue-300 hover:text-white">
              <Link to="/about">About</Link>
            </li>
            <li className="inline-block p-2 rounded hover:bg-blue-300 hover:text-white">
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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


