import {createStore,applyMiddleware , combineReducers} from "redux"
import { productReducer , getProductDetails } from "./reducers/productReducer"
import {userReducer ,profileReducer ,forgotPasswordReducer} from './reducers/userReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import {cartReducer} from './reducers/cartReducer'
import thunk from 'redux-thunk'

const middleware = [thunk];

const intialState = {
    cart:{
        cartItems:localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems") ) 
        : [],
        shippingInfo:localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    }
} 

const reducer = combineReducers({
    products:productReducer,
    productDetails :getProductDetails,
    user:userReducer,
    profile:profileReducer,
    forgotPassword : forgotPasswordReducer,
    cart:cartReducer
})

export const store=createStore(reducer, intialState , composeWithDevTools(applyMiddleware(...middleware)))
