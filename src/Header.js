import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import LogIn from './LogIn';
import LogOut from './LogOut';
import Profile from './Profile';


class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="White">
          <Navbar.Brand>My Favorite Books</Navbar.Brand>
          <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
          <NavItem><Link to="/About" className="nav-link">About</Link></NavItem>
        </Navbar>
        <div>
          <h3>Welcome!</h3>
          {this.props.auth0.isAuthenticated ?
            <>
              <Profile />
              <LogOut />
            </>
            :
            <LogIn />
          }

        </div>
      </>
    )
  }
}

export default Header;
