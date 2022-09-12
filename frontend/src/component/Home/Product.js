import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component'
import { replace_number } from '../Cart/replace';
const Product = ({product}) => {
    const options ={
        edit :false , 
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        value:product.rating,
        size:window.innerWidth < 600 ? 20 : 25,
        isHalf:true
    }
    return (
       
      
        <Link className='productCart' to={`/product/${product._id}`}>
            <img src={product.image[0].url} />
        <div className='info'>
        <p>{product.name}</p>
        <div>
            <ReactStars {...options} /><span>({replace_number(product.numOfReviews.toString())} بازدید)</span>
        </div>
        <span className='price'>{replace_number(product.price.toString())} تومان</span>
        </div>
        </Link>
       
    );
}

export default Product;
