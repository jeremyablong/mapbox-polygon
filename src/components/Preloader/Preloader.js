import React from 'react';
import './Preloader.css';

// Preloader while page loads data

// type = 'wholepage' | 'parent'
const Preloader = ({ type = 'wholepage' }) => {
    let sizes = {}
    switch(type) {
        case 'parent':
            sizes = {
                width: '100%',
                height: '100%'
            }
            break;
        default:
    }

    return (
        <div className='loading' style={ sizes }>
            <div className='preloader' />
        </div>
    );
};

export default Preloader;