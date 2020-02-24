import React from 'react';
import './Pagination.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Pagination for all listings page
// Currently supports next and prev navigation, all other components are hard coded and disabled

const PaginationNav = (props) => {
    const totalItems = props.totalItems;
    const totalPages = props.totalPages;
    const start = props.start;
    const end = props.end;

    return (
        <div className='pagination-container'>
            <div className='pagination-items-count'>
                {start + 1} to {end} of {totalItems} homes
            </div>
            <div className='pagination-nav'>
                <ul>
                    <li onClick={props.prev}><a><FontAwesomeIcon icon={faChevronLeft} /></a></li>
                    <li><a>1</a></li>
                    <li><a>2</a></li>
                    <li><a>...</a></li>
                    <li><a>{totalPages}</a></li>
                    <li onClick={props.next}><a><FontAwesomeIcon icon={faChevronRight} /></a></li>
                </ul>
            </div>
        </div>
    );
    
};

export default PaginationNav;