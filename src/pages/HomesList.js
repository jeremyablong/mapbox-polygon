import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchHomes } from '../actions';

import './HomesList.css';

import HouseCard from '../components/HouseCard/HouseCard';
import Preloader from '../components/Preloader/Preloader';

class HomesList extends Component {
    componentDidMount() {
        const limit = 50;

        this.props.fetchHomes(limit);
    }

    filterData(arr, query) {
        return arr.filter(el => {
            return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }

    renderList() {
        const listProp = this.props.list.undefined;

        console.log(listProp);

        return listProp.map(home => {
            let image = home.imageUrls;
            let url = home.config.url;
            let locale = home.data.location.location.formatted_address;
            let homeItem = home.data.item;
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

            let address = home.data.location.location.address_components;

            return (
                <HouseCard
                    image={image[0]}
                    key={url}
                    link={url}
                    address={isNaN(unitNumber) ? locale : locale + ` #${unitNumber}`}
                    price={listPrice}
                    bedrooms={isNaN(bedrooms) ? 0 : bedrooms}
                    bathrooms={isNaN(bathrooms) ? 0 : bathrooms}
                    sqft={isNaN(sqft) ? `${acres} acres` : `${sqft} sqft`} 
                />
            )
        })
    }

    render() {
        const listProp = this.props.list.undefined;

        if(!listProp) {
            return <Preloader />
        } else {
            return (
                <>
                <Helmet>
                    <meta charSet='utf=8' />
                    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
                    <title>Shimbly | Search Homes</title>
                </Helmet>
                    <div className='listings-container'>
                        <div className='map-area'></div>
                        <div className='home-list'>
                            {this.renderList()}
                        </div>
                    </div>
                </>
            );
        }
    }
};

const mapStateToProps = (state) => {
    return {
        list: state.list
    };
};

export default connect(mapStateToProps, { fetchHomes })(HomesList);