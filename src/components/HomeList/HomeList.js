import React, { Component } from 'react';
import './HomeList.css';

import HouseCard from '../HouseCard/HouseCard';

// Returns all listings specified from survey, filter, etc
// Have to loop through location portion of API to find specific parts of addresses


class HomeList extends Component {
constructor(props) {
  super(props);

  this.state = {

  };
}
    addressFilter = (prop, value) => {
        const location = prop;
        const addressComponent = location.find(({ types }) => types.includes(value));
        return addressComponent || { short_name: '', long_name: '' }
    }
    renderList = (props) => {
        return props.list.map(home => {
            let latitude = home.data.location.coordinates[1];
            let longitude = home.data.location.coordinates[0];
            let image = home.imageUrls;
            let url = home.config.url;
            let locale = home.data.location.location.formatted_address;
            let homeItem = home.data.item;
            let ln = homeItem.LN;
            let unitNumber = parseInt(homeItem.UN);
            let listPrice = parseInt(homeItem.LP);
            if (listPrice > 0) {
                listPrice = listPrice.toLocaleString(navigator.language, {
                    style: 'currency',
                    currency: 'usd',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                });
            } else {
                listPrice = '$CALL';
            }
            let bedrooms = parseInt(homeItem.BR_CUSTOM);
            let bathrooms = (parseInt(homeItem.FULL_BATHS_CUSTOM) + parseInt(homeItem.HALF_BATHS));
            let sqft = parseInt(homeItem.ASF);
            let acres = Number(homeItem.ACR);

            const addressProp = home.data.location.location.address_components;

            let streetNumber = (this.addressFilter(addressProp, 'street_number')).short_name;
            let route = (this.addressFilter(addressProp, 'route')).short_name;
            let city = (this.addressFilter(addressProp, 'locality')).short_name;
            let state = (this.addressFilter(addressProp, 'administrative_area_level_1')).short_name;
            let zipcode = (this.addressFilter(addressProp, 'postal_code')).short_name;
            console.log(home.data.location.coordinates[0])
            return (
                <HouseCard 
                    longitude={longitude} 
                    latitude={latitude}
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
    render () {
        return (
            <div className='home-list'>
                {this.renderList(this.props)}
            </div>
        );
    }
};

export default HomeList;