import React from 'react';
import './Carousel.css';

const Carousel = (props) => {
    const imageProp = props.images;
    
    return imageProp.map(image => {
        return (
            <div className='slide'>
                <img src={image} />
            </div>
        );
    });
};

export default Carousel;