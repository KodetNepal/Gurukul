import React, { useState } from 'react';
import PropTypes from 'prop-types'; // For prop validation
import { Link } from 'react-router-dom';

function Navbar({ loggedin }) {

  return (
    <nav
      className='navbar navbar-expand-lg navbar navbar-dark bg-primary'>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarExample"
          aria-controls="navbarExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">
          <img  width="36" src="/logo.png" alt="Logo" className="rounded-circle" />
        </Link>
        <div className="collapse navbar-collapse" id="navbarExample">
          <ul className="navbar-nav me-auto mb-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                to={loggedin === 'true' ? '/home' : '/'}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/events">
                Guide
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Support
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/community">
                    Community
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/features">
                    Features
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/customercare">
                    Customer Care
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          {loggedin === 'true' ? (
            <div className="d-flex align-items-center">
              <Link
                className="btn btn-secondary clk rounded-circle me-3"
                to="/profile"
                title="Profile"
              >
                <i className="fa-regular fa-user"></i>
              </Link>
             
            </div>
          ) : (
            <Link className="btn clk" to="/login">
              Sign up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  loggedin: PropTypes.string.isRequired,
};

export default Navbar;
