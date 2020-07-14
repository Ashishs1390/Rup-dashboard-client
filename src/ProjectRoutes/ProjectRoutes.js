import React,{useContext} from 'react';
import Journey from './../pages/Journeys/Journey.js';
import ViewJourneys from './../pages/ViewJourneys/ViewJourneys.js'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
function ProjectRoutes(){

    return (
        <div className="Wrapper">
            <Switch>
            <Route exact path="/Journey">
                <Journey />
            </Route>
            <Route exact path="/Journey/View/:journeyid"  children={<ViewJourneys />} >
                
            </Route>
            <Route exact path="/">
                <Redirect to="/Journey" />
            </Route>
            </Switch>
        </div>
    )
}

export default ProjectRoutes;


