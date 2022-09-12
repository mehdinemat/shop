import React , {useState , Fragment} from 'react';
import './useroptions.css'
import { Backdrop, List } from '@mui/material';
import { SpeedDial  } from '@mui/material';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { FaRegListAlt } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { logout } from '../../../action/user';
import { useAlert } from 'react-alert';
const UserOptions = ({user}) => {

    const navigate = useNavigate();

    const dispatch = useDispatch()
    
    const [open , setOpen] = useState(false)

    const alert = useAlert()

    const orders =()=>{
        navigate('/orders')
    }
    const account =()=>{
        navigate('/profile')
    }
    const cart =()=>{
        navigate('/cart')
    }
    const exit =()=>{
        dispatch(logout())
        alert.success("Logout Successfully");
    }

    const options =[
        {icon:<FaRegListAlt/> , name:'orders' , func:orders},
        {icon:<BsPerson/> , name:'profile' , func:account},
        {icon:<FiShoppingCart/>  , name:'cart' , func:cart},
        {icon:<IoExitOutline/> , name:"exit" , func:exit}
    ]

  
    

    return (
       
        <Fragment>
      
         <Backdrop open={open} style={{zIndex:"10" }}/>
         <SpeedDial
            className='speedDial'
             ariaLabel="SpeedDial tooltip example"
             onClose={()=>{setOpen(false)}}
             onOpen={()=>{setOpen(true)}}
             open={open}
             icon={
                <img
                  className="speedDialIcon"
                  src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                  alt="Profile"
                />
              }
         >
                  {options.map((item)=>(
            <SpeedDialAction
         key={item.name}
         icon={item.icon}
         tooltipTitle={item.name}
         onClick={item.func}
                     />
       
             ))}
         </SpeedDial>
        </Fragment>
    );
}

export default UserOptions;

