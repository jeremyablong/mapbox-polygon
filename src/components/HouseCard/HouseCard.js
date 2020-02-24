import React from 'react';
import { Link } from 'react-router-dom';

import './HouseCard.css'

// Renders card components for all listings grid

const HouseCard = (props) => {
    return (
        <Link className='house-card-item' to={`/homes/details/${props.link}`}>
            <div className='house-image'>
                <img src={props.image} alt={props.image} />
            </div>
            <div className='content listing-content'>
                <div className='description street'>{isNaN(props.unitNumber) ? `${props.streetNumber} ${props.route}` : `${props.streetNumber} ${props.route} #${props.unitNumber}`}</div>
                <div className='description address'>{`${props.city}, ${props.state} ${props.zipcode}`}</div>
                <div className='description list-price'><i className="tag icon"></i><span>{props.price}</span></div>
                <div className="description home-amenities">
                    <div className=""><i className="bed icon"></i><span>{props.bedrooms}</span></div>
                    <div className=""><i className="bath icon"></i><span>{props.bathrooms}</span></div>
                    <div className=""><i className="ruler combined icon"></i><span>{props.sqft}</span></div>
                </div>
            </div>
        </Link>
    )
}

export default HouseCard;