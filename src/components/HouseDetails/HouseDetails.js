import React from 'react';
import './HouseDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faParking, faThLarge } from '@fortawesome/free-solid-svg-icons';

const HouseDetails = (props) => {
    return (
        <div className='ui items grid container'>
            <div className='ten wide column'>
                <div className='details-address'>{isNaN(props.unitNumber) ? `${props.streetNumber} ${props.route}` : `${props.streetNumber} ${props.route} #${props.unitNumber}`}</div>
                <div className='details-price'>{props.listPrice}</div>
                <div className='details-location'>{`${props.city}, ${props.state} ${props.zipcode}`}</div>
                <div className='details-amenities'>
                    <div><FontAwesomeIcon icon={faBed} /><span>{`${props.bedrooms} Beds`}</span></div>
                    <div><FontAwesomeIcon icon={faBath} /><span>{`${props.bathrooms} Baths`}</span></div>
                    <div><FontAwesomeIcon icon={faThLarge} /><span>{props.sqft}</span></div>
                    <div><FontAwesomeIcon icon={faParking} /><span>{props.parking === 'N' ? 'None' : props.parking === 'G' ? 'Garage' : props.parking === 'S' ? 'Space' : 'None'}</span></div>
                </div>
                <hr />
                <div className='details-building'>
                    <div className='details-header'>Building Details</div>
                    <div className='ui list'>
                        <div className='list-column'>
                            <li>Year Built:</li>
                            <li>{props.age}</li>
                        </div>
                        <div className='list-column'>
                            <li>Property Type:</li>
                            <li>{props.propType}</li>
                        </div>
                        <div className='list-column'>
                            <li>Exterior Type:</li>
                            <li>{props.exterior}</li>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='details-building'>
                    <div className='details-header'>Room Details</div>
                    <div className='ui list'>
                        <div className='list-column-detailed'>
                            <div>Bedroom Information</div>
                            <ul>
                                <li>{`# of Bedrooms: ${props.bedrooms}`}</li>
                            </ul>
                        </div>
                        <div className='list-column-detailed'>
                            <div>Master Bedroom Information</div>
                            <ul>
                                <li>{`Size: ${props.masterBedroomSize}`}</li>
                                <li>{`Level: ${props.masterBedroomLevel}`}</li>
                                <li>{`Floor: ${props.masterBedroomFloor}`}</li>
                                <li>{`Bathroom: ${props.masterBedroomBath}`}</li>
                            </ul>
                        </div>
                        <div className='list-column-detailed'>
                            <div>Bedroom #2 Information</div>
                            <ul>
                                <li>{`Size: ${props.bedroom2Size}`}</li>
                                <li>{`Level: ${props.bedroom2Level}`}</li>
                                <li>{`Floor: ${props.bedroom2Floor}`}</li>                            </ul>
                        </div>
                        <div className='list-column-detailed'>
                            <div>Living Room Information</div>
                            <ul>
                                <li>{`Size: ${props.livingroomSize}`}</li>
                                <li>{`Level: ${props.livingroomLevel}`}</li>
                                <li>{`Floor: ${props.livingroomFloor}`}</li>
                            </ul>
                        </div>
                        <div className='list-column-detailed'>
                            <div>Dining Room Information</div>
                            <ul>
                                <li>{`Size: ${props.diningroomSize}`}</li>
                                <li>{`Level: ${props.diningroomLevel}`}</li>
                                <li>{`Floor: ${props.diningroomFloor}`}</li>
                            </ul>
                        </div>
                        <div className='list-column-detailed'>
                            <div>Kitchen Information</div>
                            <ul>
                                <li>{`Size: ${props.kitchenSize}`}</li>
                                <li>{`Level: ${props.kitchenLevel}`}</li>
                                <li>{`Floor: ${props.kitchenFloor}`}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='details-remarks'>{props.remarks}</div>
            </div>
            <div className='contact six wide column'>
                <div className='contact-inner'>
                    <div className='details-contact'>Request A Showing</div>
                    <form className='ui form'>
                        <div className='required field'>
                            <label>Full Name</label>
                            <div className='ui input'><input type='text' placeholder='Full Name' /></div>
                        </div>
                        <div className='required field'>
                            <label>Email</label>
                            <div className='ui input'><input type='email' placeholder='Email Address' /></div>
                        </div>
                        <div className='required field'>
                            <label>Phone Number</label>
                            <div className='ui input'><input type='phone' placeholder='Phone Number' /></div>
                        </div>
                        <div className='required field'>
                            <label>Message</label>
                            <textarea placeholder='Message' />
                        </div>
                    </form>
                    <div className='details-contact'>Questions? Contact an Agent</div>
                    <div className='details-phone'>{`Call/Text: ${props.phone}`}</div>
                    <div className='details-email'>{`Email: ${props.email}`}</div>
                </div>
            </div>
        </div>
    );
};

export default HouseDetails;