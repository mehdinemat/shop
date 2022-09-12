import React , {useState , useRef , useEffect} from 'react';
import './loginsignup.css'
import { AiOutlineMail ,AiFillUnlock } from "react-icons/ai";
import { BiFace } from "react-icons/bi";
import { useDispatch , useSelector } from 'react-redux';
import { login , register } from '../../action/user';
import { useNavigate  , useSearchParams} from 'react-router-dom';
import Loader  from '../../component/Loader/Loader'
const LoginSignUp = () => {

    const [searchParams] = useSearchParams()

    const {isAuthenticated , user , loading } = useSelector((state)=>state.user)

    const [onForm , setOnForm] = useState(false);
    const [profileAvatar , setProfileAvatar] = useState("/Profile.png")
    const [userinfo, setUser] = useState({
        name:"",
        email:"",
        password:""
    })

    const [loginEmail , setLoginEmail] = useState("");
    const [loginPassword , setLoginPassword] = useState("");

    const {name , email , password} = userinfo ; 

    const dispatch = useDispatch()

    const navigate =  useNavigate()
    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/profile' ;


    useEffect(()=>{
        if(isAuthenticated){
            window.location.href = `/${redirect}`

        }
        
    },[dispatch   , navigate , isAuthenticated ])

    const registerTab = useRef()
    const loginTab = useRef()
    const loginBorder= useRef()
    const registerBorder = useRef()
    const borderButtom = useRef()

    const loginActive=()=>{
        setOnForm(false)
        registerTab.current.classList.add('hideForm')
        loginTab.current.classList.remove('hideForm')
        borderButtom.current.classList.remove('borderButtomRegister')

    }
    const registerActive =()=>{
        setOnForm(true)
        loginTab.current.classList.add('hideForm')
        registerTab.current.classList.remove('hideForm')
        borderButtom.current.classList.add('borderButtomRegister')
    }
    const registerDataChange=(e)=>{

        if(e.target.name === 'avatar'){
            const reader = new FileReader()
            reader.onload =()=>{
                if(reader.readyState === 2){
                    setProfileAvatar(reader.result)
                }
            }
    
            reader.readAsDataURL(e.target.files[0])
        }else {
            setUser({...userinfo , [e.target.name]:e.target.value})
        }
      
    }
    const submitRegister = (e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.set('avatar' , profileAvatar)
        formData.set('name' , name)
        formData.set('email' , email);
        formData.set('password' , password);
        dispatch(register(formData))
    }
    console.log(`****${redirect}`)
    const loginSubmit=(e)=>{
        e.preventDefault()
    dispatch(login(email,password))
    if(isAuthenticated){
        window.location.href = `/${redirect}`
    }
    }

   

    return (
       <>
       {loading ? <Loader/> : <div className='formBase'>
            <div className='titles'>
                <span className='borderButtom' ref={borderButtom}></span>
                <div className='loginTitle ' ref={loginBorder} onClick={loginActive}>ورود</div>
                <div className='registerTitle ' ref={registerBorder} onClick={registerActive}>ثبت نام</div>
            </div>
            <div className='mainForm '>

            <form onSubmit={loginSubmit}>
            <div className='login ' ref={loginTab}>
            <div className='inputForm'>
                <AiOutlineMail className='icon'/>
            <input type='text' placeholder='ایمیل' name='email' onChange={ registerDataChange}/>
            </div>
            <div className='inputForm'>
                <AiFillUnlock className='icon'/>
            <input type="password" placeholder='رمز عبور' name='password' onChange={registerDataChange }/>
            </div>
            <span>فراموشی پسوورد؟</span>

            <button className='btnsign'>ورود</button>
            </div>
            </form>

            {/* register */}

            <form encType='multipart/form-data' onSubmit={submitRegister}>
            <div className=' register login hideForm' ref={registerTab}>
            <div className='inputForm'>
                <BiFace className='icon'/>
            <input type='text' placeholder='نام کاربری' name='name' onChange={registerDataChange}/>
            </div>
            <div className='inputForm'>
                <AiOutlineMail className='icon'/>
            <input type='text' placeholder='ایمیل' name='email' onChange={registerDataChange}/>
            </div>
            <div className='inputForm'>
                <AiFillUnlock className='icon' />
            <input type="password" placeholder="رمز عبور" name='password' onChange={registerDataChange}/>
            </div>
            <div className='inputForm file'>

                <img src={profileAvatar} />
                <input type ="file" name='avatar' accept='image/*' onChange={registerDataChange} />
            </div>


            <span>فراموشی پسوورد ؟</span>

            <button name='submit' className='btnsign'>ورود</button>

            </div>
            </form>

            </div>
        </div>}
       
       </>
    );
}

export default LoginSignUp;
