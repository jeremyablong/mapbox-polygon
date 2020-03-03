import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import NavAuth from './NavAuth';
import './Navbar.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import { PopoverBody, Popover } from 'reactstrap';
import { connect } from "react-redux"; 
import { coords } from "../../actions/coords.js";

// General Navbar

class Navbar extends Component {
constructor(props) {
  super(props);

  this.state = {
    address: "",
    gmapsLoaded: false
  };
}
    handleChange = address => {
      this.setState({ 
        address 
      });
    };
    initMap = () => {
      this.setState({
        gmapsLoaded: true
      })
    }   
    handleSelect = address => {
      this.setState({
        address
      })
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
            console.log('Success', latLng);
            this.props.coords(latLng.lng, latLng.lat)
        })
        .catch(error => console.error('Error', error));
    };
    componentDidMount () {
        window.initMap = this.initMap
        const gmapScriptEl = document.createElement(`script`)
        gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA0Ywcdqmucs7ISe3wn8Dy9kjQvfCoh5LM&libraries=places&callback=initMap`
        document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
    }
    render () {
        return (
            <nav className="ui large borderless menu body">
                <div className="ui container">
                    <div className="left menu">
                        <Link
                            className="ui header large item"
                            to="/">shimbly
                        </Link>
                        <div className="item">
                            <form className="ui icon input">
                                {this.state.gmapsLoaded ? <PlacesAutocomplete
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    onSelect={this.handleSelect} 
                                  >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                      <div>
                                        <input
                                          {...getInputProps({
                                            placeholder: 'Search Places ...',
                                            className: 'location-search-input',
                                          })}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                          {loading && <div>Loading...</div>}
                                          <Popover id="pop" placement="bottom" isOpen={true} target="Popover1">
                                            <PopoverBody>
                                          {suggestions.map(suggestion => {
                                            console.log("suggestion: ", suggestion);
                                            const className = suggestion.active
                                              ? 'suggestion-item--active'
                                              : 'suggestion-item';
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                              : { backgroundColor: '#ffffff', cursor: 'pointer' };

                                            return (
                                              <div
                                                {...getSuggestionItemProps(suggestion, {
                                                  className,
                                                  style,
                                                })}
                                              >
                                                <div style={{ padding: "10px 10px" }}>
                                                    
                                                        {suggestion.description}
                                                        
                                                </div>
                                              </div>
                                            );
                                          })}
                                           </PopoverBody>
                                        </Popover>
                                        </div>
                                       
                                      </div>
                                    )}
                                  </PlacesAutocomplete> : null}
                                <i className="search link icon" id="Popover1"></i>
                            </form>
                        </div>
                    </div>
                    <div className="right menu">
                        <NavLink
                            className='disabled item'
                            to='/learn'
                        >
                            Learn
                        </NavLink>
                        <NavLink
                            className='item'
                            to='/homes'
                        >
                            Buy
                        </NavLink>
                        <NavLink
                            className='disabled item'
                            to='/sell'
                        >
                            Sell
                        </NavLink>
                        <NavAuth />
                    </div>
                </div>
            </nav>
        );
    }
};

export default connect(null, { coords })(Navbar);