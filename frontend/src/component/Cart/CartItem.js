import React from 'react';
import { BsCartX } from "react-icons/bs";
import { replace_number } from './replace';
const CartItem = ({item , deleteCartItems}) => {
    return (
        
            <div className='item'>
                        <div className='deleteItem'>
                            <BsCartX onClick={()=> deleteCartItems(item.product)}/>
                        </div>
              
                    <div className='itemsInfo'>
                        <div className='itemName flexcl'>
                        <span className='cartItemSub'>{ item.name }</span>
                           : <span className='cartItemSub'>نام محصول</span>
                     
                        </div>
                        <div className='itemPrice flexcl'>
                        <span className='cartItemSub'>{ replace_number(item.price.toString()) }</span>
                            :<span className='cartItemSub'>قیمت محصول</span>
                        
                        </div>
                        <div className='itemNumber flexcl'>
                            <span className='cartItemSub'>{ replace_number(item.quantity.toString()) }</span>
                            <span className='cartItemSub'>: تعداد محصول</span>
                        </div>
                        
                    </div>
                    <div className='image'>
                        <img src={item.image}/>
                    </div>
                       </div>
       
    );
}

export default CartItem;
