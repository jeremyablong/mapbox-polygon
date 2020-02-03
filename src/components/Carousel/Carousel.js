import React from 'react';
import './Carousel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function renderSlides(props) {
    const imageProp = props.images;

    return imageProp.map(image => {
        return (
            <img src={image} />
        );
    });
};

const CarouselContainer = (props) => {
    return (
        <Carousel infiniteLoop showIndicators={false} showThumbs={false} showStatus={false}>
            {renderSlides(props)}
        </Carousel>
    );
};

export default CarouselContainer;