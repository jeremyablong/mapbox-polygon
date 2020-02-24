import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './FilterBar.css'

// Filter Bar for single home listings

const FilterBar = () => {
    return (
        <div className='ui secondary menu'>
            <div className='ui container'>
                <div className='item'>
                    <Link to='/homes'>
                    <button className='ui inverted button blue'>
                        <FontAwesomeIcon icon={faChevronLeft} />
                        <span>Back To Search</span>
                    </button>
                    </Link>
                </div>
                <span className='item'>|</span>
                <div className='item'>
                    <div>Overview</div>
                </div>
                <div className='item'>
                    <div>Property Details</div>
                </div>
                <div className='item'>
                    <div>Location</div>
                </div>
                <div className='item'>
                    <div>Similar Homes</div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;