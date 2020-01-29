import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="main-nav container">
            <div className='logo'>
                <Link to='/' exact>shimbly</Link>
            </div>
            <div>
                <li className="one"><NavLink
                    exact
                    activeClassName='navbar-link--active'
                    className='navbar-link'
                    to='/learn'
                >
                    Learn
                </NavLink></li>
                <li className="two"><NavLink
                    exact
                    activeClassName='navbar-link--active'
                    className='navbar-link'
                    to='/homes'
                >
                    Buy
                </NavLink></li>
                <li className="three"><NavLink
                    exact
                    activeClassName='navbar-link--active'
                    className='navbar-link'
                    to='/sell'
                >
                    Sell
                </NavLink></li>
                <li className="four"><NavLink
                    exact
                    activeClassName='navbar-link--active'
                    className='navbar-link'
                    to='/login'
                >
                    Log In
                </NavLink></li>
                <li className="five"><NavLink
                    exact
                    activeClassName='navbar-link--active'
                    className='navbar-link'
                    to='/signup'
                >
                    Sign Up
                </NavLink></li>
            </div>
        </nav>
    );
};

export default Navbar;