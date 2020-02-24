import React from 'react';
import './HomeList.css';

import HouseCard from '../HouseCard/HouseCard';

// Returns all listings specified from survey, filter, etc
// Have to loop through location portion of API to find specific parts of addresses

function addressFilter(prop, value) {
    const location = prop;

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

function renderList(props) {
    return props.list.map(home => {
        let image = home.imageUrls;
        let url = home.config.url;
        let locale = home.data.location.location.formatted_address;
        let homeItem = home.data.item;
        let ln = homeItem.LN;
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

        const addressProp = home.data.location.location.address_components;

        let streetNumber = (addressFilter(addressProp, 'street_number')).short_name;
        let route = (addressFilter(addressProp, 'route')).short_name;
        let city = (addressFilter(addressProp, 'locality')).short_name;
        let state = (addressFilter(addressProp, 'administrative_area_level_1')).short_name;
        let zipcode = (addressFilter(addressProp, 'postal_code')).short_name;

        return (
            <HouseCard
                ln={ln}
                streetNumber={streetNumber}
                route={route}
                city={city}
                state={state}
                zipcode={zipcode}
                unitNumber={unitNumber}
                image={image[0]}
                key={url}
                link={url}
                price={listPrice}
                bedrooms={isNaN(bedrooms) ? 0 : bedrooms}
                bathrooms={isNaN(bathrooms) ? 0 : bathrooms}
                sqft={isNaN(sqft) ? `${acres} acres` : `${sqft} sqft`} 
            />
        )
    })
}

const HomeList = (props) => {
    return (
        <div className='home-list'>
            {renderList(props)}
        </div>
    );
};

export default HomeList;