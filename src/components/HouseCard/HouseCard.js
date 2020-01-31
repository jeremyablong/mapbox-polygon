import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faTag, faThLarge } from '@fortawesome/free-solid-svg-icons';

import './HouseCard.css'

const HouseCard = (props) => {
    return (
        <Link class='house-card-item' to={`/homes/details/${props.link}`}>
            <div className='address'>{props.address}</div>
            <div className='list-price'><FontAwesomeIcon icon={faTag} /><span>{props.price}</span></div>
            <div className='home-amenities'>
                <p><FontAwesomeIcon icon={faBed} /><span>{props.bedrooms}</span></p>
                <p><FontAwesomeIcon icon={faBath} /><span>{props.bathrooms}</span></p>
                <p><FontAwesomeIcon icon={faThLarge} /><span>{`${props.sqft} sqft`}</span></p>
            </div>
        </Link>
    )
}

export default HouseCard;