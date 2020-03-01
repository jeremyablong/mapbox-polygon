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

// All listings page

class HomesList extends Component {
    // Setting class specific state for pagination purposes
    state = {
        limit: 24,
        loadingPageOfHomes: false
    }

    // Fetchs new data on next or prev click
    updateData = () => {
        const currentPage = getCurrentPage(this.props);
        const limit = this.state.limit;

        this.props.fetchHomes(currentPage, limit);
    }

    // Fetchs data on page mount
    componentDidMount() {
        this.updateData();
    }

    // Fetchs data on update of state
    // IMPORTANT - If not done in this manner, page number was updating incorrectly or taking extra clicks
    componentDidUpdate(prevProps, prevState) {
        if(getCurrentPage(prevProps) !== getCurrentPage(this.props)) {
            this.updateData();
        }
    }

    static getDerivedStateFromProps(props, state) {
        let loadingPageOfHomes = false
        if(props.list.undefined) {
            const { end, length } = props.list.undefined
            // check if the new set of houses has been loaded into the list
            if(end / length !== getCurrentPage(props)) {
                loadingPageOfHomes = true
            }
        }
        return {
            ...state,
            loadingPageOfHomes
        }
    }

    render() {
        const listProp = this.props.list.undefined;  // Sets const for global shorthand

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

                        <div className='map-area'></div>
                        <div className='listings-area'>
                            {
                                this.state.loadingPageOfHomes ?
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
                                disabled={this.state.loadingPageOfHomes}
                            />
                        </div>
                    </div>
                </>
            );
        }
    }
};


export function getCurrentPage(props) {
    const routerLocation = props.location;
    const queryParams = new window.URLSearchParams(routerLocation.search)
    const currentPage = parseInt(queryParams.get('page'))
    return currentPage > 1 ? currentPage : 1
}

// Maps state to props
const mapStateToProps = (state) => {
    return {
        list: state.list
    };
};

export default connect(mapStateToProps, { fetchHomes })(HomesList);