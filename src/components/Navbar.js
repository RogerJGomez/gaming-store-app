import React, { useState } from 'react'
import Shop from './Shop'
import Cart from './Cart'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom"


const LinkStyles={
    color:"rgba(0,0,0,.5)",
    textDecoration:"none"
}

const MyNav = () => {

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div style={{paddingBottom:'1%'}}>
        <Router>  
            <Navbar color="faded" light >
                <NavbarBrand  className="mr-auto"><img src="/logo-nav.png" width="200px" height="65px" alt="logo"></img></NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar >
                <Nav navbar>
                    <NavItem>
                        <Link style={LinkStyles}to="/Cart"><strong>Cart</strong></Link>
                   </NavItem>
                   <NavItem>
                        <Link style={LinkStyles} to="/Shop"><strong>Shop</strong></Link>
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