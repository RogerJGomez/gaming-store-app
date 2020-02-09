import React, { useState } from 'react'
import Shop from './Shop'
import Cart from './Cart'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";


const LinkStyles={
    color:"#000",
    textDecoration:"none"
}

const MyNav = () => {

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div style={{paddingBottom:'1%'}}>
        <Router>  
            <Navbar color="faded" light>
                <NavbarBrand  className="mr-auto">TechStore</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar>
                <Nav navbar>
                    <NavItem>
                        <Link style={LinkStyles}to="/Cart">Cart</Link>
                   </NavItem>
                   <NavItem>
                        <Link style={LinkStyles} to="/Shop">Home</Link>
                   </NavItem>
                </Nav>
                </Collapse>
            </Navbar>

            <Switch>
                <Route path="/Shop">
                    <Shop />
                </Route>
                <Route path="/Cart">
                    <Cart />
                </Route>
            </Switch>
            <Redirect exact from="/" to="Shop" />
        </Router>
    </div>
  );
}

export default MyNav;