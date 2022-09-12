import {LOGIN_REQUIEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS , 
    REGISTER_REQUEST,
    REGISTER_FAIL,
    REGISTER_SUCCESS ,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS ,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCCESS ,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL} from '../constants/UserConstant'
import axios from "axios"



export const login = (loginEmail, loginPassword) => async ( dispatch )=>{
    try{
        dispatch({type:LOGIN_REQUIEST})
        const config = {headers:{"Content-Type":"application/json"}}
        const {data} = await axios.post(`/api/v1/loginuser`,{email:loginEmail,loginPassword} ,config )
        dispatch({type:LOGIN_SUCCESS , payload:data.user})
    }catch(error){
        dispatch({type:LOGIN_FAIL , payload:error.message})
    }

}

export const register=(formData)=>async(dispatch)=>{

    try{
        console.log("step one")
        dispatch({type:REGISTER_REQUEST})
        console.log("step two")
        const config = {headers:{"Content-Type":"application/json"}}
        console.log("step tree")
        console.log(formData)
        const {data} = await axios.post(`/api/v1/registeruser` , formData, config)
        console.log("step four")

        dispatch({type:REGISTER_SUCCESS , payload:data.user})
        console.log("step five")


    }catch(error){
        dispatch({type:REGISTER_FAIL , payload:error.message})

    }

}

export const loadUser =()=>async (dispatch)=>{

    try{
        dispatch({type:LOAD_USER_REQUEST})

    const {data} = await axios.get(`/api/v1/me`)
    console.log(data.userDetails)
    dispatch({type:LOAD_USER_SUCCESS  , payload:data.userDetails })
    }catch(error){
        dispatch({type:LOAD_USER_FAIL , payload:error.message})
    }

}

export const logout = ()=> async (dispatch)=>{
    try{

        await axios.get(`/api/v1/logout`)
        dispatch({type:USER_LOGOUT_SUCCESS})


    }catch(error){
        dispatch({type:USER_LOGOUT_FAIL , payload:error.message})
    }
}

export const updateProfile = (formdata)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_PROFILE_REQUEST})
        const config=  {headers:{"Content-Type":"multipart/form-data"}};
        console.log("step one")
        const {data} = await axios.put('/api/v1/me/update' , formdata , config)
        console.log("step two")
        dispatch({type:UPDATE_PROFILE_SUCCESS , payload:data.success})

    }catch(error){dispatch({type:UPDATE_PROFILE_FAIL , payload:error.message})}
}

export const updatePassword = (formdata)=>async(dispatch)=>{

    try{
        dispatch({type:UPDATE_PASSWORD_REQUEST})
        const config = {headers :{"Content-Type":"multipart/form-data"}}
        const {data} = await axios.put('/api/v1/password/update' , formdata , config)
        dispatch({type:UPDATE_PASSWORD_SUCCESS ,payload:data.success})
    }catch(error){
        dispatch({type:UPDATE_PASSWORD_FAIL , payload:error.message})
    }

}
export const forgotPassword=(formdata)=>async(dispatch)=>{
    try{
    dispatch({type:FORGOT_PASSWORD_REQUEST})

    const config = {headers:{"Content-Type":"application/json"}}
    const {data} = await axios.post('/api/v1/password/forgot' , formdata , config)

    dispatch({type:FORGOT_PASSWORD_SUCCESS , payload:data.message})


    }catch(error){dispatch({type:FORGOT_PASSWORD_FAIL , payload:error.message})}
}
export const resetPassword =  (token , formdata)=>async(dispatch)=>{

    try{
    dispatch({type:RESET_PASSWORD_REQUEST})
    const config= {headers:{"Content-Type":"application/json"}}
    const {data} = await axios.put(`/api/v1/reset/password/${token}` , formdata,  config)
    dispatch({type:RESET_PASSWORD_SUCCESS , payload:data.success})
    }catch(error){ dispatch({type:RESET_PASSWORD_FAIL ,payload:error.message}) }

}
