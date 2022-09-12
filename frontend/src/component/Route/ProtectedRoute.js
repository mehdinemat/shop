import React from 'react';
import { useSelector , useDispatch } from 'react-redux';
import {Navigate} from 'react-router-dom'
import { loadUser } from '../../action/user';
const ProtectedRoute = ({children}) => {

    const dispatch = useDispatch()
    
    const {isAuthenticated , loading } = useSelector((state)=>state.user)

    if(loading === undefined){
       dispatch(loadUser())
    }

    if(loading === false  ){
        if(!isAuthenticated){
            return ( <Navigate to='/login' />);
        }else {
            return children
        }

    }
   
}

export default ProtectedRoute;
