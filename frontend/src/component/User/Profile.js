import React ,{useEffect} from 'react';
import './profile.css'
import { useNavigate , Link } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import Loader from '../../component/Loader/Loader'
import {loadUser} from '../../action/user'
const Profile = ({...props}) => {

    console.log("profile is here")

    const {isAuthenticated , user ,loading } = useSelector((state)=>state.user)

    const navigate = useNavigate()

    console.log(props)

    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/login')
        }
        
    },[isAuthenticated , navigate])


    return (
        <div className='container'>
            {loading ? <Loader/> :  <div className='profile'>
          <div className='leftProfile'>
                 <div className='detailsProfile'>
                 <div className='subProfile'>
                      <span className='title'>نام کامل</span>
                      <span className='subtitle'>{ user.name }</span>
                  </div>
                  <div className='subProfile'>
                  <span className='title'>ایمیل</span>
                      <span className='subtitle'>{user.email}</span>
                  </div>
                  <div className='subProfile'>
                  <span className='title'>زمان ساخت</span>
                      <span className='subtitle'>null</span>
                  </div>
                    </div>
                  <div className='profileBtn'>
                      <Link to='/orders' className='btn btnProfile'>سفارشات من</Link>
                      <Link to='password/update' className='btn btnProfile'>تغییر رمز عبور</Link>
                  </div>
              </div>
              <div className='rightProfile'>
                  <span>پروفایل من </span>
                    <div className='imageProfile'>
                    <img src={ user.avatar.url ? user.avatar.url : './Profile.png' }/>
                    <Link className='btn btnProfile' to="/me/update">ویرایش پروفایل</Link>
                    </div>
              </div>
            
            </div>  }
        </div>
    );
}

export default Profile;
