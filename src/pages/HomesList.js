import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchHomes } from '../actions';

import './HomesList.css';

import Navbar from '../components/Navbar/Navbar';
import HomeList from '../components/HomeList/HomeList';
import Pagination from '../components/Pagination/Pagination';
import Preloader from '../components/Preloader/Preloader';
import PageLoading from '../components/PageLoading/PageLoading';
import MapArea from '../components/MapArea/MapArea'

import { coordsToString, stringCoordsToArrayCoords } from '../utils/geoJsonUtil'

// All listings page

class HomesList extends Component {
    // Setting class specific state for pagination purposes
    state = {
        limit: 24,
        loadingPageOfHomes: false,
        // old chicago coords
        // coords: '-88.774948,42.458859;-86.432490,42.458859;-86.432490,41.081374;-88.774948,41.081374'
        // evanston coords
        coords: '-87.707703,42.067677;-87.704712,42.065662;-87.701378,42.064312;-87.699974,42.062313;-87.697891,42.060482;-87.695061,42.059513;-87.696091,42.057312;-87.694664,42.055313;-87.699059,42.052334;-87.702065,42.049477;-87.704056,42.048702;-87.704872,42.049507;-87.706177,42.049427;-87.706062,42.048985;-87.704689,42.048679;-87.704628,42.048313;-87.70649,42.046753;-87.708061,42.046398;-87.709053,42.0476;-87.71003,42.045284;-87.71106,42.044895;-87.713882,42.046486;-87.715065,42.045944;-87.716171,42.046211;-87.718864,42.05151;-87.721222,42.05315;-87.721817,42.054558;-87.722435,42.054695;-87.723061,42.054314;-87.723625,42.055313;-87.720711,42.055965;-87.720482,42.059315;-87.718063,42.062145;-87.715988,42.063313;-87.714058,42.065273;-87.712059,42.065178;-87.709061,42.066788;-87.708061,42.067841;-87.707703,42.067677'
    }

    updateCoords = (coords) => {
        this.setState({
            coords: coordsToString(coords)
        })
    }

    // Fetchs new data on next or prev click
    updateData = () => {
        const currentPage = getCurrentPage(this.props);
        const limit = this.state.limit;
        const poly = this.state.coords

        this.props.fetchHomes(poly, currentPage, limit);
    }

    // Fetchs data on page mount
    componentDidMount() {
        this.updateData();
    }

    // Fetchs data on update of state
    // IMPORTANT - If not done in this manner, page number was updating incorrectly or taking extra clicks
    componentDidUpdate(prevProps, prevState) {
        if(
            getCurrentPage(prevProps) !== getCurrentPage(this.props) ||
            prevState.coords !== this.state.coords
        ) {
            this.updateData();
            return
        }

        // fix incorrect page numbers after pinning
        if(prevState.coords === this.state.coords && this.props.list.undefined.totalPages < getCurrentPage(this.props)) {
            this.props.history.push('/homes')
        }
    }

    render() {
        const listProp = this.props.list.undefined;  // Sets const for global shorthand

        const loadingPageOfHomes = getLoadingPageOfHomes(this.state, this.props)

        const polyCoords = stringCoordsToArrayCoords(this.state.coords)

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
                    <div className='listings-container'>
                        <div className='map-area'>
                            <MapArea
                                coords={polyCoords}
                                updateCoords={this.updateCoords}
                            />
                        </div>
                        <div className='listings-area'>
                            {
                                loadingPageOfHomes ?
                                    <PageLoading /> :
                                    null
                            }
                            <HomeList list={listProp}/>
                            <Pagination
                                totalItems={listProp.totalItems}
                                totalPages={listProp.totalPages}
                                start={listProp.start}
                                end={listProp.end}
                                currentPage={getCurrentPage(this.props)}
                                disabled={loadingPageOfHomes}
                            />
                        </div>
                    </div>
                </>
            );
        }
    }
};

function getQueryParams(props) {
    const routerLocation = props.location;
    return new window.URLSearchParams(routerLocation.search)
}

function getCurrentPage(props) {
    const queryParams = getQueryParams(props)
    const currentPage = parseInt(queryParams.get('page'))
    return currentPage > 1 ? currentPage : 1
}

function getLoadingPageOfHomes(state, props) {
    if(props.list.undefined) {
        const { end, limit, polygon } = props.list.undefined;
        // check that the list has an old version of the filter polygon
        if(state.coords !== polygon) {
            return true
        }

        // check if the new set of houses has been loaded into the list
        if(end / limit !== getCurrentPage(props)) {
            return true
        }
    }
    return false
}

// Maps state to props
const mapStateToProps = (state) => {
    return {
        list: state.list
    };
};

export default connect(mapStateToProps, { fetchHomes })(HomesList);