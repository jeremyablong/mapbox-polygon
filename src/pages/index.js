import React from 'react';
import Helmet from 'react-helmet';
import Navbar from '../components/Navbar/Navbar';

const Index = () => {    
    return (
        <>
        <Helmet>
            <meta charSet='utf=8' />
            <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
            <title>Shimbly - The Easiest Way Home</title>
        </Helmet>
        <Navbar />
        <div>Index</div>
        </>
    );
};

export default Index;