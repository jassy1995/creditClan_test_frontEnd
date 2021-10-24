import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/user/login";
import Dashboard from "./components/user/dashboard";
import Register from "./components/user/register";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
};

export default App;
