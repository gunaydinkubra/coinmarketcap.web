import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return(
    <Router>
        <Switch>
          <Route exact path = "/">
            <Login/>
          </Route>
          <Route path = "/dashboard">
            <Dashboard/>
          </Route>
        </Switch>
    </Router>
  );
}
export default App;
