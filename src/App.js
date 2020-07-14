import React,{useContext} from 'react';
import logo from './logo.svg';
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import ProjectRoutes from './ProjectRoutes/ProjectRoutes.js'



function App() {
  return (
    <div className="Main">
       <Router>
      <div>
        <Navbar  className="Navbar" light expand="md">
        <h3 className="MainLogo">
            <img  src={logo} alt="logo" height="70" width="70"></img>
          </h3>
        <Nav className="mr-auto NavItems" navbar>
          <NavItem className="">
          
          </NavItem>
          <NavItem className="NavItem">
            <Link className="NavChild" to="/Journey">Journeys</Link>
          </NavItem>
          <NavItem className="NavItem">
            <Link className="NavChild" to="/Journey/View">Views</Link>
          </NavItem>
          </Nav>
        </Navbar>


        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
       <ProjectRoutes></ProjectRoutes>
      </div>
    </Router>
    </div>
  );
}

export default App;
