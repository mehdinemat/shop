import {CREATE_ORDER_REQUEST,
    CREATE_ORDER_FAIL , 
    CREATE_ORDER_SUCCESS} from '../action/orderAction'

export const newOrderReducer = (state ={} , action)=>{

    switch(action.type){
        case CREATE_ORDER_REQUEST:
            return {
                ...state , 
                loading :true , 

            }
            case CREATE_ORDER_SUCCESS:
                return {
                    loading :false , 
                    order:action.payload
                }
                case CREATE_ORDER_FAIL:
                    return {
                        loading: false,
                        error: action.payload,
                    }
                    default:
                        return state 
    }



}