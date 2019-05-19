import React from 'react';
import ReactDOM from 'react-dom';
import "./bootstrap/css/bootstrap.min.css";
import "animate.css";
import { UserProvider, IncidentsProvider } from "./Context";
import App from './App';


ReactDOM.render(<UserProvider><IncidentsProvider><App/></IncidentsProvider></UserProvider>, document.getElementById('root'));
