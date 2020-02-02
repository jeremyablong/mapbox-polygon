import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="main-nav container">
            <div className='logo'>
                <Link to='/'>shimbly</Link>
            </div>
            <div>
                <li><NavLink
                    activeClassName='navbar-link--active'
                    className='navbar-link'
                    to='/learn'
                >
                    Learn
                </NavLink></li>
                <li><NavLink
                    activeClassName='navbar-link--active'
                    className='navbar-link'
                    to='/homes'
                >
                    Buy
                </NavLink></li>
                <li><NavLink
                    activeClassName='navbar-link--active'
                    className='navbar-link'
                    to='/sell'
                >
                    Sell
                </NavLink></li>
                <li><NavLink
                    activeClassName='navbar-link--active'
                    className='navbar-link navbar-btn'
                    to='/login'
                >
                    Log In
                </NavLink></li>
                <li><NavLink
                    activeClassName='navbar-link--active'
                    className='navbar-link navbar-btn'
                    to='/signup'
                >
                    Sign Up
                </NavLink></li>
            </div>
        </nav>
    );
};

export default Navbar;