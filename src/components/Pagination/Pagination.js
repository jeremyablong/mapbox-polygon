import React from 'react';
import { Link } from 'react-router-dom'
import './Pagination.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// Pagination for all listings page
// Currently supports next and prev navigation, all other components are hard coded and disabled

const DisablableLink = ({ disabled, to, children }) => (
    disabled ?
        children :
        (
            <Link to={to}>
                { children }
            </Link>
        )
)

const PaginationNav = (props) => {
    const totalItems = props.totalItems;
    const totalPages = props.totalPages;
    const start = props.start;
    const end = props.end;
    const currentPage = props.currentPage;
    const disabled = props.disabled;
    const prevDisabled = disabled || currentPage - 1 < 1;
    const nextDisabled = disabled || currentPage + 1 > totalPages

    return (
        <div className='pagination-container'>
            <div className='pagination-items-count'>
                {start + 1} to {end} of {totalItems} homes
            </div>
            <div className='pagination-nav'>
                <ul>
                    <li>
                        <DisablableLink disabled={prevDisabled} to={`/homes?page=${ currentPage - 1 }`}>
                            <div className="button">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </div>
                        </DisablableLink>
                    </li>
                    <li>
                        <DisablableLink disabled={nextDisabled} to={`/homes?page=${ currentPage + 1 }`}>
                            <div className="button">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                        </DisablableLink>
                    </li>
                </ul>
            </div>
        </div>
    );

};

export default PaginationNav;