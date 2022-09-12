
import './App.css';
import {BrowserRouter as Router , Route , Routes} from "react-router-dom"
import Header from './component/layout/Header/Header'
import Footer from './component/layout/Footer/Footer';
import WebFont from 'webfontloader'
import React , {useEffect , useState} from 'react';
import thunk from "redux-thunk"
import Home from './component/Home/Home'
import ProductDetails from './component/product/productDetails';
import Products from './component/product/products'
import Search from './component/product/search'
import LoginSignUp from'./component/User/LoginSignUp'
import {store} from './store'
import {loadUser} from './action/user'
import {useDispatch , useSelector} from 'react-redux'
import UserOptions from './component/layout/Header/UserOptions'
import Profile from './component/User/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword'
import ForgotPassword from './component/User/ForgotPassword'
import Shipping from './component/Cart/Shipping';
import Cart from './component/Cart/Cart'
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import axios from 'axios';
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import Success from './component/Cart/success'
import NotFound from './component/Cart/NotFound'

function App() {

  const {isAuthenticated , user} = useSelector((state)=>state.user)

  const dispatch = useDispatch()

  const [stripeapikey , setStripeApiKey] = useState("")

   const getStripeApiKey =async()=>{
    const {data} = await axios.get('/api/v1/stripeapikey')
    
    setStripeApiKey(data.stripeApiKey)

  }
  useEffect(()=>{
     
  WebFont.load({
    google: {
      families: ['ROboto', 'Droid Serif' , 'chilanka']
    }
  });

  store.dispatch(loadUser())
  getStripeApiKey()
  },[])
  return (
    <Router> 
      <Header/>
      {isAuthenticated && <UserOptions  user={user}/>}
      <Routes>
      <Route extact path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}  />
      <Route extact path='/me/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>}/>
      <Route extact path='/password/update' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>} />
      <Route extact path='/password/reset' element={<ProtectedRoute><ForgotPassword/></ProtectedRoute>} />

      <Route extact path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute>} />
      <Route extact path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
      <Route extact path='/success' element={<Success/>}/>
     

    {stripeapikey && <Route path='/process/payment' element={<Elements stripe={loadStripe(stripeapikey)}><ProtectedRoute><Payment/></ProtectedRoute></Elements>}></Route>}
      <Route extact path="/" element={< Home />}></Route>
      <Route extact path="/product/:id" element={< ProductDetails />}></Route>
      <Route extact path='/products' element={<Products/>}></Route>
      <Route extact path='/products/:keyword' element={<Products/>}></Route>
      <Route extact path='/search' element={<Search/>}></Route>
      <Route extact path='/login' element={<LoginSignUp/>}></Route>
      <Route extact path='/cart' element={<Cart/>}></Route>
      </Routes>

    <Footer/>
    </Router>
   
  );
}

export default App;
