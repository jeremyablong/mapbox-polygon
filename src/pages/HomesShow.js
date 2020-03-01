import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchHome } from '../actions';

import Navbar from '../components/Navbar/Navbar';
import FilterBar from '../components/FilterBar/FilterBar';
import Preloader from '../components/Preloader/Preloader';
import Carousel from '../components/Carousel/Carousel';
import HouseDetails from '../components/HouseDetails/HouseDetails';

// Single home listing

class HomesShow extends Component {
    // Fetchs state on component mouting
    componentDidMount() {
        const url = this.props.match.params.id;

        this.props.fetchHome(url);
    };

    // Loops to find specific address data from API
    addressFilter(value) {
        const location = this.props.homes.undefined.data.location.location.address_components;
        return location.find(({ types }) => types.includes(value));
    }

    render() {
        const url = this.props.match.params.id;
        const homeProp = this.props.homes.undefined;  // Global const for shorthand of other variables

        if(!homeProp) {
            return <Preloader />;
        } else {
            // MAIN CONTENT
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
            let roomsTotal = homeItem.RMS;
            let sqft = parseInt(homeItem.ASF);
            let acres = Number(homeItem.ACR);
            let remarks = homeItem.REMARKS;
            let phone = homeItem.LOPHONE;
            let email = homeItem.LAEMAIL;
            let parking= homeItem.PKN;

            // ADDRESS CONTENT
            let streetNumber = (this.addressFilter('street_number')).short_name;
            let route = (this.addressFilter('route')).short_name;
            let city = (this.addressFilter('locality')).short_name;
            let state = (this.addressFilter('administrative_area_level_1')).short_name;
            let zipcode = (this.addressFilter('postal_code')).short_name;

            // SECONDARY CONTENT
            let age = homeItem.BLT;
            let propType = homeItem.TYP;
            let exterior = homeItem.EXT;
            let ac = homeItem.AIR;
            let heating = homeItem.HEA;
            let assessments = homeItem.ASM;
            let tax = homeItem.TAX;
            let taxExempts = homeItem.TXC;

            // PETS CONTENT
            let petsAllowed = homeItem.PTA;
            let petsDetail = homeItem.PET;
            let petMaxWeight = homeItem.MPW;

            // ROOM DETAILS
            //// Master
            let masterBedroomSize = homeItem.MBS;
            let masterBedroomLevel = homeItem.MBL;
            let masterBedroomFloor = homeItem.MBF;
            let masterBedroomBath = homeItem.MBB;

            //// Bedroom 2
            let bedroom2Size = homeItem.B2S;
            let bedroom2Level = homeItem.B2L;
            let bedroom2Floor = homeItem.B2F;

            //// Bedroom 3
            let bedroom3Size = homeItem.B3S;
            let bedroom3Level = homeItem.B3L;
            let bedroom3Floor = homeItem.B3F;

            //// Bedroom 4
            let bedroom4Size = homeItem.B4S;
            let bedroom4Level = homeItem.B4L;
            let bedroom4Floor = homeItem.B4F;

            //// Living
            let livingroomSize = homeItem.LRS;
            let livingroomLevel = homeItem.LRL;
            let livingroomFloor = homeItem.LRF;

            //// Dining
            let diningroomSize = homeItem.DRS;
            let diningroomLevel = homeItem.DRL;
            let diningroomFloor = homeItem.DRF;

            //// Kitchen
            let kitchenSize = homeItem.KTS;
            let kitchenLevel = homeItem.KTL;
            let kitchenFloor = homeItem.KTF;

            // ADDITIONAL CONTENT
            let appliances = homeItem.APP;
            let interiorFeatures = homeItem.INT_PROP_FEATS;
            let exteriorFeatures = homeItem.EXT_PROP_FEATS;
            let amenities = homeItem.CAA;
            let assoAmentities = homeItem.MAI;

            //// ALL DATA HAS BEEN PASSED AS PROPS TO HOUSEDETAILS

            return (
                <>
                <Helmet>
                    <meta charSet='utf=8' />
                    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
                    <title>{`${streetNumber} ${route} #${unitNumber}, ${city}, ${state} ${zipcode}`} | Shimbly</title>
                </Helmet>
                <Navbar />
                <FilterBar />
                <div className='container'>
                    <Carousel images={this.props.homes.undefined.imageUrls} />
                    <HouseDetails
                        url={url}
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
                        parking={parking}
                        roomsTotal={roomsTotal}
                        age={age}
                        propType={propType}
                        exterior={exterior}
                        ac={ac}
                        heating={heating}
                        assessments={assessments}
                        tax={tax}
                        taxExempts={taxExempts}
                        petsAllowed={petsAllowed}
                        petsDetail={petsDetail}
                        petMaxWeight={petMaxWeight}
                        masterBedroomSize={masterBedroomSize}
                        masterBedroomLevel={masterBedroomLevel}
                        masterBedroomFloor={masterBedroomFloor}
                        masterBedroomBath={masterBedroomBath}
                        bedroom2Size={bedroom2Size}
                        bedroom2Level={bedroom2Level}
                        bedroom2Floor={bedroom2Floor}
                        bedroom3Size={bedroom3Size}
                        bedroom3Level={bedroom3Level}
                        bedroom3Floor={bedroom3Floor}
                        bedroom4Size={bedroom4Size}
                        bedroom4Level={bedroom4Level}
                        bedroom4Floor={bedroom4Floor}
                        livingroomSize={livingroomSize}
                        livingroomLevel={livingroomLevel}
                        livingroomFloor={livingroomFloor}
                        diningroomSize={diningroomSize}
                        diningroomLevel={diningroomLevel}
                        diningroomFloor={diningroomFloor}
                        kitchenSize={kitchenSize}
                        kitchenLevel={kitchenLevel}
                        kitchenFloor={kitchenFloor}
                        appliances={appliances}
                        interiorFeatures={interiorFeatures}
                        exteriorFeatures={exteriorFeatures}
                        amenities={amenities}
                        assoAmentities={assoAmentities}
                    />
                </div>
                </>
            );
        }
    };
};

// Maps state to props
const mapStateToProps = (state) => {
    return {
        homes: state.homes
    };
};

export default connect(mapStateToProps, { fetchHome })(HomesShow);