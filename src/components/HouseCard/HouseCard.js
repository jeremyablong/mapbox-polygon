import React from 'react';
import { Link } from 'react-router-dom';

const HouseCard = (props) => {
    return (
        <div>
            <Link to={`/homes/details/${props.link}`}>{props.link}</Link>
        </div>
    )
}

export default HouseCard;