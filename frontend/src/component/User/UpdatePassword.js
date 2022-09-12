import React , {useState} from 'react';
import { MdOutlineVpnKey } from "react-icons/md";
import { AiOutlineLock ,AiOutlineUnlock } from "react-icons/ai";
import {useDispatch , useSelector} from 'react-redux'
import {updatePassword} from '../../action/user'
const UpdatePassword = () => {
    const [oldPassword , setOldPassword] = useState('');
    const [newPassword , setNewPassword] = useState('');
    const [confirmNewPassword , setConfirmNewPassword] = useState('') 
    
    const dispatch = useDispatch()

    const submitProfileResetPassword = (e)=>{
        e.preventDefault();
        const myForm = new FormData()
        myForm.set('oldPassword' , oldPassword);
        myForm.set('newPassword' , newPassword);
        myForm.set('confirmPassword' , confirmNewPassword)

       dispatch(updatePassword())
    }
    

    return (
        <div>
           
            <div className='editProfile'>
                <span className='title'>تغییر پسوورد</span>
            <form className='editProfileForm' encType='multi' onSubmit={submitProfileResetPassword}>
            <div className='inputForm'>
                <MdOutlineVpnKey className='icon'/>
            <input type='text' placeholder='رمز عبور قدیمی' name='name' value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}}/>
            </div>
            <div className='inputForm'>
            <AiOutlineLock className='icon'/>
            <input type='text' placeholder='رمز عبور جدید' name='email' value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}}/>
            </div>
            <div className='inputForm'>
            <AiOutlineUnlock className='icon'/>
            <input type='text' placeholder='تکرار رمز عبور جدید' name='email' value={confirmNewPassword} onChange={(e)=>{setConfirmNewPassword(e.target.value)}}/>
            </div>

            <button >ثبت</button>
                </form>
            </div>
        </div>
    );
}

export default UpdatePassword;
