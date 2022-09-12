import React from 'react';
import {ReactNavbar} from "overlay-navbar"
import logo from '../../../images/logo.png'
const Header = () => {
    const options = {
        burgerColorHover: "rgba(239, 88, 18, 0.855)",
        logo,
        logoWidth: "20vmax",
        navColor1: "white",
        logoHoverSize: "10px",
        logoHoverColor: "rgba(239, 88, 18, 0.855)",
        link1Text: "Home",
        link2Text: "Products",
        link3Text: "Contact",
        link4Text: "About",
        link1Url: "/",
        link2Url: "/products",
        link3Url: "/contact",
        link4Url: "/about",
        link1Size: "1.3vmax",
        link1Color: "rgba(35, 35, 35,0.8)",
        nav1justifyContent: "flex-end",
        nav2justifyContent: "flex-end",
        nav3justifyContent: "flex-start",
        nav4justifyContent: "flex-start",
        link1ColorHover: "rgba(239, 88, 18, 0.855)",
        link1Margin: "1vmax",
        profileIconUrl: "/login",
        profileIconColor: "rgba(239, 88, 18, 0.855)",
        searchIconColor: "rgba(239, 88, 18, 0.855)",
        cartIconColor: "rgba(239, 88, 18, 0.855)",
        profileIconColorHover: "rgba(239, 88, 18, 0.855)",
        searchIconColorHover: "rgba(239, 88, 18, 0.855)",
        cartIconColorHover: "rgba(239, 88, 18, 0.855)",
        cartIconMargin: "1vmax",
    }
    return (
        <ReactNavbar {...options}/>
    );
}

export default Header;
