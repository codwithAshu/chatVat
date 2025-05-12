import React from "react";
import { NavLink } from "react-router-dom";  // Import NavLink from react-router-dom
import "../styles/nav.css"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">CHatVat</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/" activeClassName="active" aria-current="page">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about" activeClassName="active">About</NavLink>  {/* Use NavLink here */}
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services" activeClassName="active">Services</NavLink>  {/* Use NavLink here */}
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" activeClassName="active">Contact</NavLink>  {/* Use NavLink here */}
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login" activeClassName="active">Login</NavLink>  {/* Add NavLink for Login */}
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup" activeClassName="active">Signup</NavLink>  {/* Add NavLink for Signup */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
