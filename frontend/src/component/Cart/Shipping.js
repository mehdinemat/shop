import React,{useState , useEffect} from 'react'
import { AiOutlineHome } from "react-icons/ai";import './shipping.css'
import { FaCity } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { AiTwotonePhone } from "react-icons/ai";
import {Country } from 'country-state-city'
import { useDispatch , useSelector } from 'react-redux';
import {saveShippingInfo} from '../../action/cartAction'
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
const Shipping=()=> {

    const {shippingInfo} = useSelector((state)=>state.cart)

    const alert=  useAlert()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [address , setAddress] = useState(shippingInfo.address)
    const [country , setCountry] = useState(shippingInfo.country)
    const [city , setCity] = useState(shippingInfo.city)
    const [postCode , setPostCode] = useState(shippingInfo.postCode)
    const [phoneNumber , setPhoneNumber ] = useState(shippingInfo.phoneNumber)

    const handleFormShipping =(e)=>{
        e.preventDefault()
        if(address == undefined || country == undefined || city == undefined || postCode == undefined || phoneNumber ==undefined)
        {
            alert.error('اطلاعات را وارد کنید.')
            return
        }
        console.log(phoneNumber)
        if(phoneNumber.length !== 11){
            alert.error("شماره تلفن درست نیست")
           
        }
        console.log(address)
        if(address == '' || country == '' || city==''|| postCode=='')
        {
            alert.error('لطفا اطلاعات لازم را وارد کنید .')
          
        }
        dispatch(saveShippingInfo({address , country , city , postCode , phoneNumber} ))
        navigate('/order/confirm')
    }
    
  return (
    <>
    <div className='container'>
      <div className='formShipping'>

        <span>اطلاعات ارسال</span>
        <form  onSubmit={handleFormShipping} encType="multipart/form-data">
        <div className='inputForm'>
        <AiOutlineHome className='icon'/>
        <input type='text' placeholder='آدرس' onChange={(e)=>setAddress(e.target.value)}/> 
        </div>
        <div className='inputForm'>
        <FaCity className='icon'/>
        <input type='text' placeholder='شهر' onChange={(e)=>setCity(e.target.value)}/> 
        </div>
        <div className='inputForm'>
        <RiAccountPinCircleFill className='icon'/>
        <input type='text' placeholder='کد پستی' onChange={(e)=>setPostCode(e.target.value)}/> 
        </div>
        <div className='inputForm'>
        <AiTwotonePhone className='icon'/>
        <input type='text' placeholder='شماره تلفن' onChange={(e)=>setPhoneNumber(e.target.value)}/> 
        </div>
      <div className='inputForm'>
      <AiTwotonePhone className='icon'/>
      <select className='select' onChange={(e)=>setCountry(e.target.value)}>
           {Country && Country.getAllCountries().map((item)=>(
            <option>{item.name}</option>
           ))}
        </select>
      </div>
            <button className='btn'>تایید</button>

        </form>
      </div>
    </div>
    </>
  )
}

export default Shipping
