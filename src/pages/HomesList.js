import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchHomes } from '../actions';

import Navbar from '../components/Navbar/Navbar';
import HouseCard from '../components/HouseCard/HouseCard';
import Preloader from '../components/Preloader/Preloader';

class HomesList extends Component {
    componentDidMount() {
        this.props.fetchHomes();
    }

    renderList() {
        const listProp = this.props.list.undefined;

        return listProp.map(home => {
            return (
                <HouseCard key={home.item.LN} link={home.item.LN} />
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
                <div className='container'>{this.renderList()}</div>
                </>
            );
        }
    }
};

const mapStateToProps = (state) => {
    return {
        list: state.list,
        homes: state.homes
    };
};

export default connect(mapStateToProps, { fetchHomes })(HomesList);