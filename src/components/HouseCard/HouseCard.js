import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LNNumber } from "../../actions/LNunique.js";
import { coords } from "../../actions/coords.js";
import './HouseCard.css';
import { connect } from "react-redux";

// Renders card components for all listings grid

class HouseCard extends Component {
constructor(props) {
  super(props);

  this.state = {

  };
}
    renderHoverLogic = () => {
        console.log("blah :", this.props);
        this.props.LNNumber(this.props.ln);
        this.props.coords(this.props.longitude, this.props.latitude);
    }
    render () {
        console.log("second props", this.props)
        return (
            <Link onMouseEnter={this.renderHoverLogic} className='house-card-item' to={`/homes/details/${this.props.link}`}>
                <div className='house-image'>
                    <img src={this.props.image} alt={this.props.image} />
                </div>
                <div className='content listing-content'>
                    <div className='description street'>{isNaN(this.props.unitNumber) ? `${this.props.streetNumber} ${this.props.route}` : `${this.props.streetNumber} ${this.props.route} #${this.props.unitNumber}`}</div>
                    <div className='description address'>{`${this.props.city}, ${this.props.state} ${this.props.zipcode}`}</div>
                    <div className='description list-price'><i className="tag icon"></i><span>{this.props.price}</span></div>
                    <div className="description home-amenities">
                        <div className=""><i className="bed icon"></i><span>{this.props.bedrooms}</span></div>
                        <div className=""><i className="bath icon"></i><span>{this.props.bathrooms}</span></div>
                        <div className=""><i className="ruler combined icon"></i><span>{this.props.sqft}</span></div>
                    </div>
                </div>
            </Link>
        );
    }
}

export default connect(null, { LNNumber, coords })(HouseCard);