import React , {useRef} from 'react'
import CheckOutSteps from './CheckOutSteps'
import './payment.css'
import { useSelector , useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import axios from 'axios'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js'
  import { HiOutlineCreditCard } from "react-icons/hi";
  import { MdOutlineCreditCardOff ,MdOutlineVpnKey } from "react-icons/md";
  import { useNavigate } from 'react-router-dom'
import { createOrder } from '../../action/orderAction'

  
function Payment() {

    const alert = useAlert()

    const navigate = useNavigate()

    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()

    const {shippingInfo  , cartItems} = useSelector((state)=>state.cart)
    const {user} = useSelector((state)=>state.user)
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))


    const paymentData = {
        amount:Math.round(orderInfo.totalPrice * 100)
    }

    const order = {
        shippingInfo ,
        orderItems:cartItems , 
        itemsPrice : orderInfo.subtotal , 
        shippingPrice : orderInfo.shippingCharges , 
        totalPrice : orderInfo.totalPrice,
    }


    const submitHandler =(e)=>{
      console.log("submittam")
    }

    // const submitHandler = async(e)=>{
    //     e.preventDefault()
      
    //     payBtn.current.disabled = true ;
    //     try{

    //         const config = {
    //             headers:{
    //                 'Content-Type':'application/json',
    //             },
    //         }
    //         const {data} = await axios.post('/api/v1/payment/process' ,  paymentData , config)
    //         console.log("sddsdgsg*********sa")
    //         const client_secret = data.client_secret;

    //         if (!stripe || !elements) return;

    //         const result = await stripe.confirmCardPayment(client_secret, {
    //             payment_method: {
    //               card: elements.getElement(CardNumberElement),
    //               billing_details: {
    //                 name: user.name,
    //                 email: user.email,
    //                 address: {
    //                   city: shippingInfo.city,
    //                   state: shippingInfo.state,
    //                   postal_code: shippingInfo.postCode,
    //                   country: shippingInfo.country,
    //                 },
    //               },
    //             },
    //           });

    //           if (result.error) {
    //             payBtn.current.disabled = false;
        
    //             alert.error(result.error.message);
    //           }else {
    //             if (result.paymentIntent.status === "succeeded") {
    //               order.paymentInfo = {
    //                 id: result.paymentIntent.id,
    //                 status: result.paymentIntent.status,
    //               };
    //               dispatch(createOrder(order));

    //               navigate("/success");
    //             }else {
    //                 alert.error("There's some issue while processing payment ");
    //               }
    //             }


    //     }catch(error){
      

    //         payBtn.current.disabled = false 
    //         alert.error(error.message)
    //     }
    // }



    const payBtn = useRef(null)

    return (
    <div className='container'>
      <div className='paymentBox'>
      <CheckOutSteps active={2} />
      <div className='paymentContainer'>
        <form className='paymentForm' onSubmit={submitHandler}>
            <div>
                <HiOutlineCreditCard className='icon'/>
            <CardNumberElement className='CartElement'/>
            </div>
            <div>
                <MdOutlineCreditCardOff className='icon'/>
                <CardExpiryElement className='CartElement'/>
            </div>
            <div>
                <MdOutlineVpnKey className='icon'/>
                <CardCvcElement className='CartElement'/>
            </div>
            <input
        className='btn'
        type="submit"
        ref={payBtn}
        value={` pay-${orderInfo && orderInfo.totalPrice}  `}
        />
        </form>
     
      </div>
      </div>
    </div>
  )
}

export default Payment
