import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchHomes } from '../actions';

import './HomesList.css';

import Navbar from '../components/Navbar/Navbar';
import HomeList from '../components/HomeList/HomeList';
import Pagination from '../components/Pagination/Pagination';
import Preloader from '../components/Preloader/Preloader';

// All listings page

class HomesList extends Component {
    // Setting class specific state for pagination purposes
    state = {
        limit: 24,
        currentPage: 1
    }

    // Shows next page of listings
    toNextPage = () => {
        if(this.state.currentPage !== this.props.list.undefined.totalPages) {
            this.setState({ currentPage: this.state.currentPage + 1 });
        }
    }

    // Shows previous page of listings
    toPrevPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({ currentPage: this.state.currentPage - 1 });
        }
    }

    // Fetchs new data on next or prev click
    updateData = () => {
        const currentPage = this.state.currentPage;
        const limit = this.state.limit;

        this.props.fetchHomes(currentPage, limit);
    }

    // Fetchs data on page mount
    componentDidMount() {
        this.updateData();
    }

    // Fetchs data on update of state
    // IMPORTANT - If not done in this manner, page number was updating incorrectly or taking extra clicks
    componentDidUpdate() {
        this.updateData();
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
                            <HomeList list={listProp}/>
                            <Pagination
                                totalItems={listProp.totalItems}
                                totalPages={listProp.totalPages}
                                start={listProp.start}
                                end={listProp.end}
                                next={this.toNextPage}
                                prev={this.toPrevPage}
                            />
                        </div>
                    </div>
                </>
            );
        }
    }
};

// Maps state to props
const mapStateToProps = (state) => {
    return {
        list: state.list
    };
};

export default connect(mapStateToProps, { fetchHomes })(HomesList);