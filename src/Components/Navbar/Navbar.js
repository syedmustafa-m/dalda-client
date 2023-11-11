import React, { useState } from 'react';
import './Navbar.css';

import logo from '../../images/logo.png'
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <div>
      <div className="Navbar">
        <div className="Navbar__Link Navbar__Link-brand">
        <Link to="/"><img src={logo} /></Link>
        </div>
        <div className="Navbar__Link Navbar__Link-toggle" onClick={handleMenuToggle}>
          <i className="fas fa-bars"></i>
        </div>
        <nav className={`Navbar__Items ${isMenuOpen ? 'Navbar__ToggleShow' : ''}`}>
          <Link to="/" className="Navbar__Link">
            <i className="fa fa-home" aria-hidden="true"></i> Home
          </Link>
          <Link to="/welcome" className="Navbar__Link">
            <i className="fa fa-lightbulb" aria-hidden="true"></i> Cost Effective Ideas
          </Link>
          <Link to="/idealstatus" className="Navbar__Link">
            <i className="fa fa-cog" aria-hidden="true"></i> Ideas Status
          </Link>
          <Link to="/dashboard" className="Navbar__Link">
            <i className="fa fa-user-circle" aria-hidden="true"></i> Dashboard
          </Link>
          <Link to="/dashboard" className="Navbar__Link" onClick={handleLogout}>
            <i className="fa fa-user-circle" aria-hidden="true"></i> Logout
          </Link>
        </nav>




        <nav class='none' >

        </nav>
      </div>
    </div>
  );
}
