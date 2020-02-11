import React from 'react';
import './Pagination.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


const Pagination = (props) => {
    const totalItems = props.totalItems;
    const totalPages = props.totalPages;

    return (
        <div className='pagination-container'>
            <div className='pagination-items-count'>
                1 to 24 of {totalItems} homes
            </div>
            <div className='pagination-nav'>
                <ul>
                    <li><a><FontAwesomeIcon icon={faChevronLeft} /></a></li>
                    <li><a>1</a></li>
                    <li><a>2</a></li>
                    <li><a>...</a></li>
                    <li><a>{totalPages}</a></li>
                    <li><a><FontAwesomeIcon icon={faChevronRight} /></a></li>
                </ul>
            </div>
        </div>
    );
};

export default Pagination;