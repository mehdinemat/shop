import React , {useState , useEffect} from 'react';
import { BsPerson } from "react-icons/bs";
import './updateprofile.css'
import { AiOutlineMail  } from "react-icons/ai";
import { useSelector , useDispatch } from 'react-redux';
import {loadUser, updateProfile} from '../../action/user'
import { useAlert } from 'react-alert';

const UpdateProfile = () => {

    const dispatch = useDispatch()

    const alert = useAlert()

    const {user} = useSelector((state)=>state.user)
    const {error , isUpdated , loading } = useSelector((state)=>state.profile)
    
    const [name , setName] = useState("")
    const [email , setEmail] =useState("")
    const [avatar , setAvatar] = useState("")

    const formdata = new FormData();
    const submitProfileEditForm=(e)=>{
        e.preventDefault()
        formdata.set('name' , name)
        formdata.set('email' , email)
        formdata.set('avatar' , avatar)

        dispatch(updateProfile(formdata))

    }
    const onChangeProfImage = (e)=>{
        const reader = new FileReader()
        reader.onload=()=>{
            if(reader.readyState === 2)
            {
                setAvatar(reader.result)
            }
        }
       reader.readAsDataURL(e.target.files[0])
    
    }
    useEffect(()=>{
        setName(user.name);
        setEmail(user.email);
        setAvatar(user.avatar.url)  
        if(error){
            alert.error(error)
        }
        if(isUpdated)
        {
            alert.success("پروفایل بروز رسانی شد .")
            dispatch(loadUser())
        }


    },[isUpdated , error , alert , dispatch, user])


    return (
        <div>
           
            <div className='editProfile'>
                <span className='title'>ویرایش پروفایل</span>
            <form className='editProfileForm' encType='multi' onSubmit={submitProfileEditForm}>
            <div className='inputForm'>
                <BsPerson className='icon'/>
            <input type='text' placeholder='نام' name='name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <div className='inputForm'>
                <AiOutlineMail className='icon'/>
            <input type='text' placeholder='ایمیل' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className='inputForm editProfileRow'>
                <img src={avatar ? avatar : "/Profile.png" } />
                <span>تغییر عکس پروفایل</span>
                <input type='file' placeholder='ایمیل' name='email' onChange={onChangeProfImage}/>
            </div>

            <button className='btn'>ثبت</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProfile;
