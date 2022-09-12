import {LOGIN_REQUIEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS ,REGISTER_REQUEST,
    REGISTER_FAIL,
    REGISTER_SUCCESS ,LOAD_USER_REQUEST
    ,LOAD_USER_FAIL,
    LOAD_USER_SUCCESS , USER_LOGOUT_FAIL , USER_LOGOUT_SUCCESS,UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS ,UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL} from '../constants/UserConstant'

export const userReducer = ( state={user:{}}, action )=>{

    switch(action.type){
        case LOGIN_REQUIEST:
            case REGISTER_REQUEST:
                case LOAD_USER_REQUEST:
            return {
                loading : true , 
                isAuthenticated:false,
            }
            case LOGIN_SUCCESS:
              case REGISTER_SUCCESS:
                  case LOAD_USER_SUCCESS:
                return {
                    ...state,
                    loading :false , 
                    isAuthenticated:true , 
                    user:action.payload
                }
                case LOGIN_FAIL:
                   case REGISTER_FAIL:
                    return {
                        ...state,
                        loading:false , 
                        isAuthenticated:false , 
                        user:null,
                        error:action.payload
                    }
                    case LOAD_USER_FAIL:
                        return {
                            loading:false , 
                            isAuthenticated:false , 
                            user:null,
                            error:action.payload
                        }
                        case USER_LOGOUT_SUCCESS:
                            return {
                                loading :false , 
                                isAuthenticated : false , 
                                user:null
                            }
                            case USER_LOGOUT_FAIL:
                                return {
                                    ...state , 
                                    loading:false ,
                                    isAuthenticated:false , 
                                    user:null , 
                                    error :action.payload
                                }
                    default:
                        return {
                            state
                        }
    }
}
    export const profileReducer=(state={} , action)=>{


        switch(action.type){
            case UPDATE_PASSWORD_REQUEST:
            case UPDATE_PROFILE_REQUEST:
                return {
                    ...state, 
                    loading:true 
                }
                case UPDATE_PASSWORD_SUCCESS:
                case UPDATE_PROFILE_SUCCESS:
                    return {
                        ...state , 
                        loading :false , 
                        isupdated : action.payload
                    }
                    case UPDATE_PASSWORD_FAIL:
                    case UPDATE_PROFILE_FAIL :
                        return {
                            ...state, 
                            loading :false , 
                            error :action.payload
                        }
                        default:
                            return state;


        }



    }

    export const forgotPasswordReducer = (state={} , action)=>{
        switch(action.type){
            case FORGOT_PASSWORD_REQUEST:
                return {
                    ...state , 
                    loading:true , 
                    error:null
                }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state , 
                loading:false ,
                message : action.payload
            }
        case FORGOT_PASSWORD_FAIL:
            return {
                ...state , 
                loading :false ,
                error :action.payload
            }
            default:{
                return state ;
            }
            }
    }

