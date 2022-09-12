import React,{useState}from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { AiOutlineLock ,AiOutlineUnlock } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../action/user';
const ResetPassword = () => {

    const dispatch = useDispatch();
    const match = useParams()

    const { error , success , loading  } = useSelector((state)=>state.forgotpassword)

const [newPassword , setNewPassword] = useState();
const [confirmNewPassword , setConfirmNewPassword] = useState()

    const submitProfileResetPassword = (e)=>{
        e.preventDefault()

        const formdata = new FormData()
        formdata.set('password' , newPassword)
        formdata.set('confirmPassword' , confirmNewPassword)
        dispatch(resetPassword(match.token , formdata))
    }

    return (
        <div>
             <div className='editProfile'>
                <span className='title'>فراموشی رمز عبور</span>
            <form className='editProfileForm' encType='multi' onSubmit={submitProfileResetPassword}>
            <div className='inputForm'>
            <AiOutlineLock className='icon'/>
            <input type='text' placeholder='رمز عبور جدید' name='email' value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}}/>
            </div>
            <div className='inputForm'>
            <AiOutlineUnlock className='icon'/>
            <input type='text' placeholder='تکرار رمز عبور' name='email' value={confirmNewPassword} onChange={(e)=>{setConfirmNewPassword(e.target.value)}}/>
            </div>
            <button >ثبت</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
