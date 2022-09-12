import React from 'react';
import playStore from '../../../images/Appstore.png';
import appStore from '../../../images/playstore.png'
import './Footer.css'
const Footer = () => {
    return (
        <div id='footer' >
            <div className='left'>
            <h3>مارا دنبال کنید</h3>
            <span>Instagram</span>
            <span>Youtube</span>
            <span>Facebook</span>
            </div>
            <div className='center'>
            <h1>فروشگاه</h1>
            <p>Copyrights 2022 &copy; nematnejad</p>
            </div>
            <div className='right'>
            <span>دانلود اپلیکیشن ما</span>
            <span>دانلود اپ برای اندروید و تلفن همراه</span>
            <img src={playStore} alt="palystore"/>
            <img src={appStore} alt="appstore"/>
            </div>
        </div>
    );
}

export default Footer;
