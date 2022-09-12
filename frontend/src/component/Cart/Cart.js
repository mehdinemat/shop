import React,{useState} from  'react';
import {useSelector , useDispatch} from 'react-redux'
import './cart.css'
import { useNavigate } from 'react-router-dom';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import CartItem from './CartItem'
import {removeItemFromCart , addCart} from '../../action/cartAction'
import { replace_number } from './replace';
const Cart = () => {

    const navigate = useNavigate()

    const [totalPrice , setTotalPrice] = useState("")

    const {cartItems} = useSelector((state)=>state.cart)

    const dispatch = useDispatch()

    const deleteCartItems=(e)=>{

        dispatch(removeItemFromCart(e))

    }
    const reduceOfNumberItem =(id, quantity)=>{
        const qua = quantity - 1;
        if(1 > qua)
        {
            return ;
        }
        dispatch(addCart(id , qua))

    } 
    const increaseOfNumberItem=(id , stock , quantity)=>{
        const qua = quantity + 1 ;
        if(qua > stock){
            return ;
        }
        dispatch(addCart(id , qua))
        
    }
    const checkOutHandler= ()=>{
        navigate('/login?redirect=shipping')
    }



    return (
        <div className='container cart'>  
                <div className='totalBox'>
                <span>قیمت کل : </span><br/>
                 <span>{replace_number(cartItems.reduce((total , item)=> total + item.quantity * item.price , 0 ).toString())} هزار تومان</span>
               <br/>
               <br/>
               <div className='checkOut'>
                        <button className='btn' onClick={()=>checkOutHandler()}>ادامه</button>
                    </div>
                </div>


            <div className='cartBox'>
                 {cartItems.length > 0 ? 
                <div className='itemsBox'>

                { cartItems.map((item)=>{  
                 return (
                     <div className='boxOfItem'>
                         <div className='redInc'>

                         <span onClick={()=>reduceOfNumberItem(item.product , item.quantity)}>-</span>
                        <span onClick={()=>increaseOfNumberItem(item.product , item.stock , item.quantity)}>+</span>
                         </div>
                    <CartItem item={item} deleteCartItems={deleteCartItems}/>
                   
                    </div>
                 )}
                ) }

                </div> :<div className='empty'>
                    <MdOutlineRemoveShoppingCart className='icon' style={{fontSize:45}}/>
                    <span>سبد خرید خالیست !</span>
                </div> 

                 }
                

            </div>
        </div>
    );
}

export default Cart;
