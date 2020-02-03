import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav className="main-nav container">
            <div className='logo'>
                <Link to='/'>shimbly</Link>
                <form className='search-container'>
                    <input type='text' className='search-bar' placeholder='Search an address, neighborhood, city, or ZIP code' />
                    <FontAwesomeIcon icon={faSearch} />
                </form>
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