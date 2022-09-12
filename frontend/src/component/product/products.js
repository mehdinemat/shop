import React ,{useEffect , useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { getProduct } from '../../action/productAction';
import Product from '../Home/Product'
import Loader from '../Loader/Loader';
import { useParams , useSearchParams  } from 'react-router-dom';
import Pagination from 'react-js-pagination'
import Typography from '@mui/material/Typography';
import { Slide, Slider } from '@mui/material';
const Products = () => {
    
    const match = useParams()
    const [searchParams] = useSearchParams();
    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
      ];
    
    //const of filtering 
   
    
    const [rating , setRating] = useState(0)     
    const [category , setCategory] = useState("")     
    const [price , setPrice] = useState([0,99999999])     
    const [currentPage , setCurrentPage] = useState(1)     


    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)
        
    }
    const priceHandler = (event, newPrice) => {
     
        setPrice(newPrice);
      };
      
    const ratingHandler=(event , newPrice)=>{
        setRating(newPrice)
        console.log(category)
    }
   

    const dispatch = useDispatch()
    const {products , loading , productCount , productPerPage} = useSelector((state)=>state.products)
    useEffect(()=>{
        dispatch(getProduct(searchParams.get("keyword")?searchParams.get("keyword"):"" , price , currentPage , rating ,category))
    },[dispatch ,price , currentPage , rating ,category])

    return (
        <>
        {loading ?<Loader/> : (<div className='product_main'>
        <div >
       
        </div>
       
        <div className='products'>
       <span className='Featured' id='Featured'>محصولات ویژه</span>
       <div className='div_pf' style={{width:70 +'vw'}}>
   {products && products.map((product , index)=>
       <Product product={product} key={index}/>
   )}
       
       </div>
       {productPerPage < productCount && (
           <Pagination activePage={currentPage} 
           itemsCountPerPage={productPerPage}
           totalItemsCount={productCount}
           onChange={setCurrentPageNo}
           nextPageText="بعدی"
           prevPageText="قبلی"
           firstPageText="1"
           lastPageText="آخر"
           itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
           />
       )}
   </div>
   <div className='filter_box'> 
        <Typography>قیمت</Typography>
        <Slider
        value={price}
        onChangeCommitted={priceHandler}
        aria-labelledby="range-slider"
        valueLabelDisplay='auto'
        min={0}
        max={1000000}
        />
        <div>
            
            
        </div>

        <Typography > نمره </Typography>
            <Slider
            value={rating}
            aria-labelledby="range-slider"
            min={0}
            max={5}
            valueLabelDisplay='auto'
            onChangeCommitted={ratingHandler}
            />
      
        </div>
   </div>)}
   </>
    );
}

export default Products;
