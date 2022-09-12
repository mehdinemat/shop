import { ALL_PRODUCT_FAIL , ALL_PRODUCT_SUCCESS , ALL_PRODUCT_REQUEST, CLEAR_ERRORS ,PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST } from "../constants/productConstants";

export const productReducer = (state = {products:[]} , action)=>{

    switch(action.type){
        case ALL_PRODUCT_REQUEST:
          
            return {        
                loading : true , 
                products:[],
            }
        case ALL_PRODUCT_SUCCESS:
            console.log("requires is here")
            return {
                loading:false , 
                products:action.payload.product,
                productCount:action.payload.productCount,
                productPerPage :action.payload.numberOfPerPage,
                countAllOfProducts:action.payload.countAllOfProducts
            };

        case ALL_PRODUCT_FAIL:
            return {
                loading:false, 
                error : action.payload
                
            };
            case CLEAR_ERRORS:
                return {
                    ...state , 
                    error:null
                };
            default:
                return state

    }

}

export const getProductDetails = ( state = {productDetails:{}} , action ) => {
            switch(action.type){
                case PRODUCT_DETAILS_REQUEST:
                    return {
                        loading:true , 
                        ...state
                    }
                case PRODUCT_DETAILS_SUCCESS:
                    return{
                        loading:false , 
                        productDetails:action.payload.productDetails
                    }    
                case PRODUCT_DETAILS_FAIL:
                    return {
                        loading:false, 
                        error:action.payload
                    }
                    case CLEAR_ERRORS:
                        return {
                            ...state , 
                            error:null
                        };
                    default:
                        return state
      
            }
}