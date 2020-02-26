import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import NavAuth from './NavAuth';
import './Navbar.css';

// General Navbar

const Navbar = () => {
    return (
        <nav className="ui large borderless menu">
            <div className="ui container">
                <div className="left menu">
                    <Link
                        className="ui header large item"
                        to="/">shimbly
                    </Link>
                    <div className="item">
                        <form className="ui icon input">
                            <input type="text" placeholder="Search Landmarks...." />
                            <i className="search link icon"></i>
                        </form>
                    </div>
                </div>
                <div className="right menu">
                    <NavLink
                        className='disabled item'
                        to='/learn'
                    >
                        Learn
                    </NavLink>
                    <NavLink
                        className='item'
                        to='/homes'
                    >
                        Buy
                    </NavLink>
                    <NavLink
                        className='disabled item'
                        to='/sell'
                    >
                        Sell
                    </NavLink>
                    <NavAuth />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;