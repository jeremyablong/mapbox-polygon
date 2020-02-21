import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchHomes } from '../actions';

import './HomesList.css';

import HomeList from '../components/HomeList/HomeList';
import Pagination from '../components/Pagination/Pagination';
import Preloader from '../components/Preloader/Preloader';

class HomesList extends Component {
    state = {
        limit: 24,
        currentPage: 1
    }

    toNextPage = () => {
        if(this.state.currentPage !== this.props.list.undefined.totalPages) {
            this.setState({ currentPage: this.state.currentPage + 1 });
        }
    }

    toPrevPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({ currentPage: this.state.currentPage - 1 });
        }
    }

    updateData = () => {
        const currentPage = this.state.currentPage;
        const limit = this.state.limit;

        this.props.fetchHomes(currentPage, limit);
    }

    componentDidMount() {
        this.updateData();
    }

    componentDidUpdate() {
        this.updateData();
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

const mapStateToProps = (state) => {
    return {
        list: state.list
    };
};

export default connect(mapStateToProps, { fetchHomes })(HomesList);