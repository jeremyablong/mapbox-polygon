import React from 'react';
import './HouseDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faTag, faThLarge } from '@fortawesome/free-solid-svg-icons';

const HouseDetails = (props) => {
    return (
        <div className='content'>
            <div className='details-content-left'>
                <div className='details-street'>{isNaN(props.unitNumber) ? `${props.streetNumber} ${props.route}` : `${props.streetNumber} ${props.route} #${props.unitNumber}`}</div>
                <div className='details-price'>{props.listPrice}</div>
                <div className='details-location'>{`${props.city}, ${props.state} ${props.zipcode}`}</div>
                <div className='home-amenities'>
                    <p><FontAwesomeIcon icon={faBed} /><span>{`${props.bedrooms} Beds`}</span></p>
                    <p><FontAwesomeIcon icon={faBath} /><span>{`${props.bathrooms} Baths`}</span></p>
                    <p><FontAwesomeIcon icon={faThLarge} /><span>{props.sqft}</span></p>
                </div>
                <hr />
                <div className='details-remarks'>{props.remarks}</div>
            </div>
            <div className='details-content-right'>
                <div className='details-contact'>Questions? Contact an Agent</div>
                <div className='details-phone'>{`Call/Text: ${props.phone}`}</div>
                <div className='details-email'>{`Email: ${props.email}`}</div>
            </div>
        </div>
    );
};

export default HouseDetails;