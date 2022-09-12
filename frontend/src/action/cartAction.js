import axios from 'axios'
import {ADD_TO_CART , REMOVE_CART_ITEM , SAVE_SHIPPING_INFO} from '../constants/CartContants'


export const addCart = (id , quantity ) =>async(dispatch , getState)=>{

    const { data } = await axios.get(`/api/v1/products/${id}`)
console.log( data.productDetails)
        dispatch({type:ADD_TO_CART , 
        payload:{
            product: data.productDetails._id,
            name:  data.productDetails.name,
            price: data.productDetails.price,
            image: data.productDetails.image[0].url,
            stock: data.productDetails.stock,
            quantity,
        }})
        console.log(getState())
        localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cartItems))


}

export const removeItemFromCart = (id)=>async(dispatch , getState)=>{

    dispatch({type:REMOVE_CART_ITEM , payload:id})

    localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cartItems))

}
export const saveShippingInfo =(data)=>async(dispatch , getState)=>{

    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data
    })
    localStorage.setItem("shippingInfo" , JSON.stringify(data))
}