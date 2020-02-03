import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './FilterBar.css'

const FilterBar = () => {
    return (
        <div className='filter-bar container'>
            <Link to='/homes'>
            <button className='back-btn'>
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>Back To Search</span>
            </button>
            </Link>
            <span>|</span>
            <div className='home-content-nav'>
                <a>Overview</a>
                <a>Property Details</a>
                <a>Location</a>
                <a>Similar Homes</a>
            </div>
        </div>
    );
};

export default FilterBar;