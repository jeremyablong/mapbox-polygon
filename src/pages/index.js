import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/HomeNav';

import './index.css';

// Home Page

const Index = () => {    
    return (
        <>
        <Helmet>
            <meta charSet='utf=8' />
            <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
            <title>Shimbly - The Easiest Way Home</title>
        </Helmet>
        <Navbar />
        <div className="home-page">
            <div className="ui centered grid container">
                <div className="ui sixteen wide column white center aligned extreme header">Find Your Perfect Home</div>
                <Link to="/homes">
                    <button className="ui huge blue button">Start Here</button>
                </Link>
            </div>
        </div>
        </>
    );
};

export default Index;