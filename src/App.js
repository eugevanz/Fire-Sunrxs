import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserContext } from "./Context";
import Nav from "./Router/Nav";
import Incidents from "./Router/RouteIncidents";
import NewIncident from "./Router/RouteNewIncident/New_Inc";
import Victory from './Router/RouteVictory/Victory';
import Login from "./Login";

export default () => {
  const [user] = useContext(UserContext);
  
  return user ? (<Router>
    <div>
      <Nav/>
      <div className="animated fadeInUp faster">
        <Route exact path="/" strict component={Victory}/>
        <Route exact path="/incidents/" strict component={Incidents}/>
        <Route exact path="/new_incident/" strict component={NewIncident}/>
      </div>

    </div>
  </Router>) : (<Login/>);
};