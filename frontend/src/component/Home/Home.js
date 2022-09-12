import React , {useEffect} from 'react';
import './Home.css'
import { CgMouse } from "react-icons/cg";
import Product from './Product'
import MetaData from '../layout/MetaData';
import { getProduct } from '../../action/productAction';
import {useSelector , useDispatch} from 'react-redux'
import Loader from '../Loader/Loader';
import {useAlert} from 'react-alert'
import { replace_number } from '../Cart/replace';

const Home = () => {
  
    const alert = useAlert()
    const dispatch = useDispatch();
    const {  products , loading , error } = useSelector((state)=>state.products  )

   
    useEffect(() => {
        if(error){
            return alert.error(error)
        }
        dispatch(getProduct())
    }, [dispatch , error]);
    return (
      
      <>
      <MetaData title="صفحه اصلی"/>
      {loading ? <Loader/> : <div className='main'>
            <div id='container'>
                <div id='container_items'>
                <span>به فروشگاه خوش آمدید</span>
                <h2>محصولات شگفت انگیز دلخواه را در پایین پیدا کنید</h2>
                <a href='#Featured'><button className='btn' >  <CgMouse />محصولات</button></a>
                </div>
        </div>
        <div className='products'>
            <span className='Featured' id='Featured'>محصولات ویژه</span>
            <div className='div_pf' style={{width:70 +'vw'}}>
        {products && products.map((product , index)=>
            <Product product={product} key={index}/>
        )}
            
            </div>
        </div>
       </div>}
      </>
            
    
    );
}

export default Home;
