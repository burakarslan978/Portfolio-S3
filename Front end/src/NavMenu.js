import React, { useContext, useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { UserContext } from './UserContext';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './firebase';

export const NavMenu = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        checkEmail(user.email);
    }});

  }, [])

  const checkEmail = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:5157/FirebaseStorageService/CheckEmail?email=${encodeURIComponent(email)}`
      );
      const data = await response.json();
      const id = data.id;
      console.log(id);
      if (id === "0") {
        console.log(id);
        setIsRegistered(false);
        return false;
      } else {
        setIsRegistered(true);
        return true;
      }
    } catch (error) {
      // Show error message
      console.log(error);
    }
  };

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
        <NavbarBrand tag={Link} to="/">
          Front_end
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
          <ul className="navbar-nav flex-grow">
            {isRegistered && (
              <>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/home">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/savedvideos">
                    Opgeslagen beelden
                  </NavLink>
                </NavItem>
              </>
            )}
            {user && (
              <NavItem>
                <NavLink tag={Link} className="text-dark" onClick={handleLogout}>
                  Logout
                </NavLink>
              </NavItem>
            )}
          </ul>
        </Collapse>
      </Navbar>
    </header>

  );
};