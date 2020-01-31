import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchHome, fetchImage } from '../actions';
import './HomesShow.css';

import Navbar from '../components/Navbar/Navbar';
import Preloader from '../components/Preloader/Preloader';

class HomesShow extends Component {
    componentDidMount() {
        const url = this.props.match.params.id;

        this.props.fetchHome(url);
        this.props.fetchImage(url.slice(5), url)
    };

    render() {
        const homeProp = this.props.homes.undefined;

        if(!homeProp) {
            return <Preloader />;
        } else {
            let locale = homeProp.location;
            let homeItem = homeProp.item;
            let listPrice = parseInt(homeItem.LP).toLocaleString(navigator.language, {
                style: 'currency',
                currency: 'usd',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            let bedrooms = homeItem.BRALL;
            let bathrooms = (parseInt(homeItem.FULL_BATHS_CUSTOM) + parseInt(homeItem.HALF_BATHS));
            let sqft = homeItem.ASF;
            let remarks = homeItem.REMARKS;
            let phone = homeItem.LOPHONE;
            let email = homeItem.LAEMAIL;

            console.log(this.props.image);

            let image = this.props.image;

            return (
                <>
                <Helmet>
                    <meta charSet='utf=8' />
                    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
                    <title>{locale.location.formatted_address} | Shimbly</title>
                </Helmet>
                <Navbar />
                <div className='container'>
                    <div className='picture'>
                        <img src={image} />
                    </div>
                    <div className='content'>
                        <h1>Address</h1>
                        <h2>{locale.location.formatted_address}</h2>
                        <h1>Price</h1>
                        <h2>{listPrice}</h2>
                        <hr />
                        <h2>{`${bedrooms} Beds`}</h2>
                        <h2>{`${bathrooms} Baths`}</h2>
                        <h2>{`${sqft} sq ft`}</h2>
                        <hr />
                        <h1>Included</h1>
                        <h2>{remarks}</h2>
                        <h3>{`Call/Text: ${phone}`}</h3>
                        <h3>{`Email: ${email}`}</h3>
                    </div>
                </div>
                </>
            );
        }
    };
};

const mapStateToProps = (state) => {
    return {
        homes: state.homes,
        image: state.image
    };
};

export default connect(mapStateToProps, { fetchHome, fetchImage })(HomesShow);