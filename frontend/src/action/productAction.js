import axios from 'axios';

import {

    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_SUCCESS,
PRODUCT_DETAILS_FAIL,
PRODUCT_DETAILS_REQUEST,
    CLEAR_ERRORS

} from '../constants/productConstants'


export const getProduct = (keyword ="" , price = [0,99999999] , currentPage = 1  , ratings = 0 ,category) => async(dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCT_REQUEST})

        let link = `/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}&rating[gte]=${ratings}`

        if(category){
         link = `/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&page=${currentPage}&rating[gte]=${ratings}$category=${category}`
         
        }

        const {data} = await axios.get(link)
      
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        })
    }catch(error){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.message
        })
    }
}

export const getProductDetails = (id) => async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/v1/products/${id}`)
      
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data,
        })
    }catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.message
        })
    }
}


export const clearErros=()=>(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}