import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchHomes } from '../actions';

import './HomesList.css';

import Navbar from '../components/Navbar/Navbar';
import HouseCard from '../components/HouseCard/HouseCard';
import Preloader from '../components/Preloader/Preloader';

class HomesList extends Component {
    componentDidMount() {
        const limit = 10;

        this.props.fetchHomes(limit);
    }

    renderList() {
        const listProp = this.props.list.undefined;

        console.log(listProp);

        return listProp.map(home => {
            let url = home.config.url;
            let locale = home.data.location.location.formatted_address;
            let homeItem = home.data.item;
            let listPrice = parseInt(homeItem.LP).toLocaleString(navigator.language, {
                style: 'currency',
                currency: 'usd',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });
            let bedrooms = homeItem.BRALL;
            let bathrooms = (parseInt(homeItem.FULL_BATHS_CUSTOM) + parseInt(homeItem.HALF_BATHS));
            let sqft = homeItem.ASF;

            return (
                <HouseCard
                    key={url}
                    link={url}
                    address={locale}
                    price={listPrice}
                    bedrooms={bedrooms}
                    bathrooms={bathrooms}
                    sqft={sqft} 
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
                <Navbar />
                    <div className='container listings-container'>
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