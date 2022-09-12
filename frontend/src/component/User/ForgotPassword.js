import React , {useState , useEffect} from 'react';
import { useAlert } from 'react-alert';
import { AiOutlineMail  } from "react-icons/ai";
import { useDispatch , useSelector } from 'react-redux';
import { forgotPassword } from '../../action/user';
const ForgotPassword = () => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const {error , message } = useSelector((state)=>state.forgotPassword)

    useEffect(()=>{
        if(error){
            alert.error(error)
        }

        if(message){
            alert.success(message)
        }

    },[error , message , dispatch , alert])


    const [email , setEmail ]=useState()

    const submitProfileResetPassword = (e)=>{
        e.preventDefault();
        const formdata = new FormData()
        formdata.set('email' , email)
        dispatch(forgotPassword(formdata))
    }

    return (
        <div>
              <div className='editProfile'>
                <span className='title'>فراموشی رمز عبور</span>
            <form className='editProfileForm' encType='multi' onSubmit={submitProfileResetPassword}>
            <div className='inputForm'>
            <AiOutlineMail className='icon'/>
            <input type='text' placeholder='ایمیل' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>

            <button >ثبت</button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
