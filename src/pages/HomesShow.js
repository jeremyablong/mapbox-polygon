import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchHome } from '../actions';
import './HomesShow.css';

import FilterBar from '../components/FilterBar/FilterBar';
import Preloader from '../components/Preloader/Preloader';
import Carousel from '../components/Carousel/Carousel';
import HouseDetails from '../components/HouseDetails/HouseDetails';

class HomesShow extends Component {
    componentDidMount() {
        const url = this.props.match.params.id;

        this.props.fetchHome(url);
    };

    render() {
        const homeProp = this.props.homes.undefined;

        if(!homeProp) {
            return <Preloader />;
        } else {
            let homeProp = this.props.homes.undefined.data;
            let locale = homeProp.location.location.formatted_address;
            let homeItem = homeProp.item;
            let unitNumber = parseInt(homeItem.UN);
            let listPrice = parseInt(homeItem.LP).toLocaleString(navigator.language, {
                style: 'currency',
                currency: 'usd',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            let bedrooms = parseInt(homeItem.BRALL);
            let bathrooms = (parseInt(homeItem.FULL_BATHS_CUSTOM) + parseInt(homeItem.HALF_BATHS));
            let sqft = parseInt(homeItem.ASF);
            let acres = Number(homeItem.ACR);
            let remarks = homeItem.REMARKS;
            let phone = homeItem.LOPHONE;
            let email = homeItem.LAEMAIL;

            return (
                <>
                <Helmet>
                    <meta charSet='utf=8' />
                    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
                    <title>{locale} | Shimbly</title>
                </Helmet>
                <FilterBar />
                <div className='container'>
                    <Carousel images={this.props.homes.undefined.imageUrls} />
                    <HouseDetails
                        locale={locale}
                        unitNumber={unitNumber}
                        listPrice={listPrice}
                        bedrooms={isNaN(bedrooms) ? 0 : bedrooms}
                        bathrooms={isNaN(bathrooms) ? 0 : bathrooms}
                        sqft={isNaN(sqft) ? `${acres} acres` : `${sqft} sqft`}
                        remarks={remarks}
                        phone={phone}
                        email={email}
                    />
                </div>
                </>
            );
        }
    };
};

const mapStateToProps = (state) => {
    return {
        homes: state.homes
    };
};

export default connect(mapStateToProps, { fetchHome })(HomesShow);