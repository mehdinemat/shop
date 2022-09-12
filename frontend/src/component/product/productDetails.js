import React , {useEffect , useState} from 'react';
import './productDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import {getProductDetails , clearErros} from '../../action/productAction'
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
import { Fragment } from 'react';
import {Rating} from '@material-ui/lab';
import ReviewsCart from './ReviewsCart';
import Loader from '../Loader/Loader'
import {addCart} from '../../action/cartAction'
import { useAlert } from 'react-alert';
import { replace_number } from '../Cart/replace';
import { useNavigate } from 'react-router-dom';
const ProductDetails = () => {

    const [quantity , setQuantity] = useState(1)
    const navigate = useNavigate()
   
    const match = useParams()

    const dispatch = useDispatch()
    const {loading , productDetails , error} = useSelector((state)=>state.productDetails)
    const alert = useAlert()
   

    const reduceNumber = ()=>{
     if(quantity > 0)
     {
        let qan = quantity -1 
        setQuantity(qan)
     }
      
    }
    const increaseNumber=()=>{
        let qan = quantity + 1
        if(productDetails.stock >= qan ){

            let qan = quantity + 1
            setQuantity(qan)
        }else {return}

    }
    const addToCartHandler = ()=>{

        dispatch(addCart(match.id , quantity))
        navigate('/cart')
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErros())
        }
      dispatch(getProductDetails(match.id))
        

    },[dispatch, match.id,alert ])


    const options = {
        size: "large",
        value: productDetails.ratings,
        readOnly: true,
        precision: 0.5,
      };

    return (
         <Fragment>

        {loading ? <Loader/> : (
            <div>
                


             <div className='mainDetails'>
              
              <div className='details'>
                <div className='subscribe'>
                    <span>{productDetails.name}</span>
                    <span className='subTitle'>Product # {productDetails._id}</span>
                </div>
                <div className='rating'>
            
                </div>
                <div className='price'>
                   <div className='priceUnit'>
                   <span>قیمت واحد :</span>
                   <span className='toman'>{productDetails.price && 
                   replace_number(productDetails.price.toString())} تومان</span>
                   </div>
                   <div className='changeNumber'>
                       <div><button className='numberBtn' onClick={reduceNumber}>-</button><input className='numberInput' value={replace_number(quantity.toString())}  type="text"/><button  className='numberBtn' onClick={increaseNumber}>+</button></div>
                       <button className='btn' onClick={addToCartHandler}>اضافه به کارت</button>
                   </div>
                </div>
               <div className='status'>
                   <span >وضعیت : </span><span className={productDetails.stock < 1 ? "redColor" : "greenColor"}>{productDetails.stock < 0 ? "تمام شده" : "موجود"}</span>
               </div>
               <div className='description'>
                   <span className='title'>توضیحات :</span>
                   <span className='subTitle' style={{marginBottom:20}}>{productDetails.description && replace_number(productDetails.description)}</span>
                   <button className='btn'>ثبت</button>
               </div>
              </div>
              <div className='img_div'>
       
              <Carousel>

       {productDetails.image && productDetails.image.map((item, i)=>{
          { console.log("salam")}
        return <img
                 className="CarouselImage"
                 key={i}
                 src='https://i.ibb.co/DRST11n/1.webp'
                 alt={`${i} Slide`}
               />
      
       })}
      </Carousel>
              </div>
            
               </div>

        <div className='review_div'>
        <h3 className='reviewsHeading'>نظرات</h3>

        <div className='reviews'>
        {productDetails.reviews ? productDetails.reviews.map((review , index)=>{
        return <ReviewsCart reviews={review} key={index}/>
        })  : <p>نظری وجود ندارد</p>}

</div>


        </div>

        
            </div>
        )}
              

       
        </Fragment>
    );
}

export default ProductDetails;
