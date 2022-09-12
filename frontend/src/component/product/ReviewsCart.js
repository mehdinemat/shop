import React from 'react';
import profileImage from '../../images/Profile.png'
const ReviewsCart = ({reviews}) => {
    return (
        <div className='review'>
            <img src={profileImage} />
            <span>{reviews.name}</span>
            <div>star</div>
            <p>{reviews.comment}</p>
        </div>
    ); 
}

export default ReviewsCart;
