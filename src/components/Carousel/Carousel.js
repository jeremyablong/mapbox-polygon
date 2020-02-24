import React from 'react';
import './Carousel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// Check out react-responsive-carousel npm for info on customizing Carousel

function renderSlides(props) {
    const imageProp = props.images;

    return imageProp.map((image, index) => {
        return (
            <img src={image} key={index} alt={index} />
        );
    });
};

const CarouselContainer = (props) => {
    return (
        <div className='ui container'>
            <Carousel infiniteLoop showIndicators={false} showThumbs={false} showStatus={false}>
                {renderSlides(props)}
            </Carousel>
        </div>
    );
};

export default CarouselContainer;