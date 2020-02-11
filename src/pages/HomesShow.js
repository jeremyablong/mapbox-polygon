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

    addressFilter(value) {
        const location = this.props.homes.undefined.data.location.location.address_components;

        for(let i = 0; i < location.length; i++){
            if(location[i].types.length > 1){
                for(let j = 0; j < location[i].types.length; j++){
                    if(location[i].types[j] == value){
                        return location[i];
                    }
                };
            } else {
                if(location[i].types == value){
                    return location[i];
                }
            }
        }
    }

    render() {
        const homeProp = this.props.homes.undefined;
        
        if(!homeProp) {
            return <Preloader />;
        } else {
            let homeProp = this.props.homes.undefined.data;
            let homeItem = homeProp.item;
            let unitNumber = parseInt(homeItem.UN);
            let listPrice = parseInt(homeItem.LP).toLocaleString(navigator.language, {
                style: 'currency',
                currency: 'usd',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            let bedrooms = parseInt(homeItem.BR_CUSTOM);
            let bathrooms = (parseInt(homeItem.FULL_BATHS_CUSTOM) + parseInt(homeItem.HALF_BATHS));
            let sqft = parseInt(homeItem.ASF);
            let acres = Number(homeItem.ACR);
            let remarks = homeItem.REMARKS;
            let phone = homeItem.LOPHONE;
            let email = homeItem.LAEMAIL;

            let streetNumber = (this.addressFilter('street_number')).short_name;
            let route = (this.addressFilter('route')).short_name;
            let city = (this.addressFilter('locality')).short_name;
            let state = (this.addressFilter('administrative_area_level_1')).short_name;
            let zipcode = (this.addressFilter('postal_code')).short_name;

            return (
                <>
                <Helmet>
                    <meta charSet='utf=8' />
                    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
                    <title>{`${streetNumber} ${route} #${unitNumber}, ${city}, ${state} ${zipcode}`} | Shimbly</title>
                </Helmet>
                <FilterBar />
                <div className='container'>
                    <Carousel images={this.props.homes.undefined.imageUrls} />
                    <HouseDetails
                        streetNumber={streetNumber}
                        route={route}
                        city={city}
                        state={state}
                        zipcode={zipcode}
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