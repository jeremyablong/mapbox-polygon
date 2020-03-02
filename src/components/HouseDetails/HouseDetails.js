import React, { Component } from 'react';
import './HouseDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faParking } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'

// Renders single page listing
class HouseDetails extends Component {
    // Sets state for contact form
    state = {
        formName: '',
        formEmail: '',
        formPhone: '',
        formMessage: '',
    }

    // Sets name from form
    onNameChange = (event) => {
        this.setState({
            formName: event.target.value,
        });
    };

    // Sets email from form
    onEmailChange = (event) => {
        this.setState({
            formEmail: event.target.value,
        });
    };

    // Sets phone from form
    onPhoneChange = (event) => {
        this.setState({
            formPhone: event.target.value,
        });
    };

    // Sets message from form
    onMessageChange = (event) => {
        this.setState({
            formMessage: event.target.value,
        });
    };

    // Handles form submission
    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://8p2sp46uw3.execute-api.us-east-1.amazonaws.com/dev', {
            source: this.props.url,
            name: this.state.formName,
            email: this.state.formEmail,
            phone: this.state.formPhone,
            message: this.state.formMessage,
        })
        .then(res => alert('Your message has been submitted successfully!'))
        .catch(err => alert('An error has occurred. Please try again.'))
    };

    render() {
        return (
            <div className='ui items grid container'>
                <div className='ten wide column'>
                    <div className='details-address'>{isNaN(this.props.unitNumber) ? `${this.props.streetNumber} ${this.props.route}` : `${this.props.streetNumber} ${this.props.route} #${this.props.unitNumber}`}</div>
                    <div className='details-price'>{this.props.listPrice}</div>
                    <div className='details-location'>{`${this.props.city}, ${this.props.state} ${this.props.zipcode}`}</div>
                    <div className='details-amenities'>
                        <div><i className="bed icon"></i><span>{`${this.props.bedrooms} Beds`}</span></div>
                        <div><i className="bath icon"></i><span>{`${this.props.bathrooms} Baths`}</span></div>
                        <div><i className="ruler combined icon"></i><span>{this.props.sqft}</span></div>
                        <div><FontAwesomeIcon icon={faParking} /><span>{this.props.parking === 'N' ? 'None' : this.props.parking === 'G' ? 'Garage' : this.props.parking === 'S' ? 'Space' : 'None'}</span></div>
                    </div>
                    <hr />
                    <div className='details-building'>
                        <div className='details-header'>Building Details</div>
                        <div className='ui list'>
                            <div className='list-column'>
                                <li>Year Built:</li>
                                <li>{this.props.age}</li>
                            </div>
                            <div className='list-column'>
                                <li>Property Type:</li>
                                <li>{this.props.propType}</li>
                            </div>
                            <div className='list-column'>
                                <li>Exterior Type:</li>
                                <li>{this.props.exterior}</li>
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
                                    <li>{`# of Bedrooms: ${this.props.bedrooms}`}</li>
                                </ul>
                            </div>
                            <div className='list-column-detailed'>
                                <div>Master Bedroom Information</div>
                                <ul>
                                    <li>{`Size: ${this.props.masterBedroomSize}`}</li>
                                    <li>{`Level: ${this.props.masterBedroomLevel}`}</li>
                                    <li>{`Floor: ${this.props.masterBedroomFloor}`}</li>
                                    <li>{`Bathroom: ${this.props.masterBedroomBath}`}</li>
                                </ul>
                            </div>
                            <div className='list-column-detailed'>
                                <div>Bedroom #2 Information</div>
                                <ul>
                                    <li>{`Size: ${this.props.bedroom2Size}`}</li>
                                    <li>{`Level: ${this.props.bedroom2Level}`}</li>
                                    <li>{`Floor: ${this.props.bedroom2Floor}`}</li>
                                </ul>
                            </div>
                            <div className='list-column-detailed'>
                                <div>Living Room Information</div>
                                <ul>
                                    <li>{`Size: ${this.props.livingroomSize}`}</li>
                                    <li>{`Level: ${this.props.livingroomLevel}`}</li>
                                    <li>{`Floor: ${this.props.livingroomFloor}`}</li>
                                </ul>
                            </div>
                            <div className='list-column-detailed'>
                                <div>Dining Room Information</div>
                                <ul>
                                    <li>{`Size: ${this.props.diningroomSize}`}</li>
                                    <li>{`Level: ${this.props.diningroomLevel}`}</li>
                                    <li>{`Floor: ${this.props.diningroomFloor}`}</li>
                                </ul>
                            </div>
                            <div className='list-column-detailed'>
                                <div>Kitchen Information</div>
                                <ul>
                                    <li>{`Size: ${this.props.kitchenSize}`}</li>
                                    <li>{`Level: ${this.props.kitchenLevel}`}</li>
                                    <li>{`Floor: ${this.props.kitchenFloor}`}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='details-remarks'>{this.props.remarks}</div>
                </div>
                <div className='contact six wide column'>
                    <div className='contact-inner'>
                        <div className='details-contact'>Request A Showing</div>
                        <form className='ui form' onSubmit={this.handleSubmit}>
                            <div className='required field'>
                                <label>Full Name</label>
                                <div className='ui input'>
                                    <input
                                        type='text'
                                        placeholder='Full Name'
                                        value={this.state.value}
                                        onChange={this.onNameChange}
                                    />
                                </div>
                            </div>
                            <div className='required field'>
                                <label>Email</label>
                                <div className='ui input'>
                                    <input
                                        type='email'
                                        placeholder='Email Address'
                                        value={this.state.value}
                                        onChange={this.onEmailChange}
                                    />
                                </div>
                            </div>
                            <div className='required field'>
                                <label>Phone Number</label>
                                <div className='ui input'>
                                    <input
                                        type='number'
                                        placeholder='Phone Number'
                                        value={this.state.value}
                                        onChange={this.onPhoneChange}
                                    />
                                </div>
                            </div>
                            <div className='required field'>
                                <label>Message</label>
                                <textarea
                                    placeholder='Message'
                                    value={this.state.value}
                                    onChange={this.onMessageChange}
                                />
                            </div>
                            <button type='submit' className='ui fluid button'>Submit</button>
                        </form>
                        <div className='details-contact'>Questions? Contact an Agent</div>
                        <div className='details-phone'>{`Call/Text: ${this.props.phone}`}</div>
                        <div className='details-email'>{`Email: ${this.props.email}`}</div>
                    </div>
                </div>
            </div>
        );
    }
};
export default HouseDetails;