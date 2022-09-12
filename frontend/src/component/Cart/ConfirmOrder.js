import React ,{useEffect} from 'react'
import CheckOutSteps from './CheckOutSteps'
import './confirmorder.css'
import {useSelector} from 'react-redux'
import {replace_number} from './replace'
import { useNavigate } from 'react-router-dom'
function ConfirmOrder() {
    
    const navigate = useNavigate()


    const {user} = useSelector((state)=>state.user)
    const {shippingInfo , cartItems} = useSelector((state)=> state.cart )

    const subtotal = cartItems.reduce((total , item)=>total + item.price * item.quantity  , 0)
  
    const shippingCharges_fa = subtotal > 500000 ? 'رایگان' : replace_number('1000');
    const shippingCharges =subtotal > 500000 ? 'رایگان' : 1000;
    
    const handlePaymentBtn = ()=>{
        const data = {
            subtotal,
            shippingCharges,
            totalPrice:subtotal+shippingCharges
        }
        sessionStorage.setItem('orderInfo' , JSON.stringify(data))
        navigate('/process/payment')
    }
    // const handlePaymentBtn =async ()=>{
    //     await axios.post(`https://localhost:4000/create-checkout-session` , {cartItems , userId: user._id}).then((res)=>{
    //       if(res.data.url){
    //           window.location.href = res.data.url
    //       }
    //     }).catch((err)=>{console.log(err.message)})
    //   }


  return (
    <div className='container'>
        <div className='mainBox'>
        <div className='stepCheck'>
        <CheckOutSteps active={1}/>
        </div>
       <div className='detailsUser'>
        <span className='subject'>مشخصات کابر</span>
            <div className='right'>
            <div>
                <span className='title'>نام کاربر :</span>
                <span className='subTitle'>{ user.name }</span>
            </div>
            <div>
                <span className='title'>ایمیل :</span>
                <span className='subTitle'>{ user.email }</span>
            </div>
            <div>
                <span className='title'>کشور :</span>
                <span className='subTitle'>{ shippingInfo.country }</span>
            </div>
            </div>
           <div className='left'>
           <div>
                <span className='title'>شهر :</span>
                <span className='subTitle'>{ shippingInfo.city }</span>
            </div>
            <div>
                <span className='title'>کد پستی :</span>
                <span className='subTitle'>{ shippingInfo.postCode }</span>
            </div>
            <div>
                <span className='title'>شماره تلفن :</span>
                <span className='subTitle'>{ replace_number(shippingInfo.phoneNumber.toString()) }</span>
            </div>
           </div>
        </div>
        <div className='detailsOrder'>
        <span className='subject'>لیست کالا</span>

            {cartItems.map((item)=>   
          <div className='orderItem'>

               <div className='image'>
                <img src={item.image} />
            </div>
             <div className='orderDetails'>
                <div> 
                <span className='title'>نام محصول : </span>    
                <span className='subTitle'>{item.name}</span>    
                </div>
                <div>
                    <span className='title'>تعداد : </span>
                    <span className='subTitle'>{replace_number(item.quantity.toString())}</span>
                </div>
                <div>
                    <span className='title'>قیمت :</span>
                    <span className='subTitle'>{ replace_number(item.price.toString()) }</span>
                </div>
                <div>
                    <span className='title'>قیمت نهایی محصول :</span>
                    <span className='subTitle'>{ replace_number((item.price * item.quantity).toString()) }</span>
                </div>
             </div>

         </div>
            )}
        </div>
        <div className='orderSummary'>
        <span className='subject'>خلاصه سفارش</span>
                <div>     
                <div>
                    <span className='title'>قمیت کل محصول :</span>
                    <span className='subTitle'>{ replace_number(subtotal.toString()) }</span>
                </div>
                <div>
                    <span className='title'>هزینه حمل و نقل :</span>
                    <span className='subTitle'>{ shippingCharges_fa }</span>
                </div>
                <div>
                    <span className='title'>قیمت نهایی با احتساب هزینه حمل و نقل :</span>
                    <span className='subTitle'>{ replace_number((subtotal + shippingCharges).toString()) }</span>
                </div>
                </div>
                <div>
                   <button className='btn' onClick={handlePaymentBtn}>پرداخت</button>
                </div>

        </div>
        </div>

    </div>
  )
}

export default ConfirmOrder
