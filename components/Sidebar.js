import styled from "styled-components"
import {
    appearObj,
    Left,
    Center,
    Right,
    BtnLink
} from '../styles/Global.style'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button';
import { keyframes } from "styled-components"
import { DataContext } from '../store/GlobalState'
import { useContext, useState } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'

const Hamburger = styled.div`
    width: 40px;
    height: 40px;
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 1s ease-in-out;
    -moz-transition: 1s ease-in-out;
    -o-transition: 1s ease-in-out;
    transition: 1s ease-in-out;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    & span{
        display: block;
        position: absolute;
        height: 2px;
        width: 100%;
        background: darkgreen;
        border-radius: 2px;
        opacity: 0;
        left: 0;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: 2s ease-in-out;
        -moz-transition: 2s ease-in-out;
        -o-transition: 2s ease-in-out;
        transition: 2s ease-in-out;
    }
    & span:nth-child(1){
        top: 0px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
    }
    & span:nth-child(2){
        top: 8px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
    }
    & span:nth-child(3){
        top: 16px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
    }
    &.open span:nth-child(1){
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
        top: 2px;
        left: 8px;
        opacity: 1;
        height: 5px;
    }
    
    &.open span:nth-child(2){
        width: 0%;
        opacity: 1;
    }
    &.open span:nth-child(3){
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        top: 30px;
        left: 8px;
        opacity: 1;
        height: 5px;
    }
   

`

const SidebarWrapper = styled.div`
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    left: 50%;
    transform: translate(-50%, 0);
    height: 100vh;
    background-color: rgba(0,0,0, 0.75);
    opacity: 1;
    width: 100%;
    z-index: 999999;
    animation: ${appearObj} 0.4s cubic-bezier(0.075, 0.82, 0.165, 1) ;
    overflow: hidden;
`;

const SidebarFooter = styled.div`
width: 100%;
height: 20vh;
display: flex;
align-items: center;
justify-content: center;
position: relative;
top: 10%;
`
const SidebarLink = styled.a`
    cursor: pointer;
    font-weight: 600;
    font-size: 2rem;
    margin-top: 1.4rem;
    color: #fff;
    transition: color linear 0.2s;
    &:hover{
        color: darkgreen;
    }
`

const SidebarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 20%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
`

const CloseBtn = styled(CloseIcon)({
    color: "white",
    fontSize: "2.4rem",
    cursor: 'pointer',
    transition: "color linear 0.2s",
    '&:hover': {
        color: "darkgreen",
    }
})

const LinkStore = styled.a`
    color: #fff;
    cursor: pointer ;
    transition: color linear 0.2s;

    &:hover {
        color: darkgreen;
        text-decoration: underline;
    }
`

const Sidebar = () => {
    const { state, dispatch } = useContext(DataContext)
    const { scrollScreen, auth } = state

    const [sideBar, setSideBar] = useState(false)

    const isOpen = () =>{
        if(scrollScreen){
            return "open"
        }
        else return ""
    }

    const handleLogout = () =>{
        Cookies.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstLogin')
        dispatch({type: 'AUTH', payload: {}})
        dispatch({type: 'NOTIFY', payload: {success: 'Logged out!'}})
        return router.push('/')
    }

    const handleToggleSidebar = () => {
        dispatch({type: 'TOGGLE_SIDEBAR', payload: !scrollScreen})
    }

    return(
        <SidebarWrapper>
        <SidebarHeader>
            <Left>
                <Hamburger className={isOpen()} onClick={handleToggleSidebar}>
                   <span></span>
                   <span></span>
                   <span></span>
                </Hamburger>
                {/* <CloseBtn fontSize="medium" color="action" 
                onClick={handleToggleSidebar}/> */}
            </Left>
            <Right>
                <Link href="#">
                    <LinkStore >Find us in store</LinkStore>
                </Link>
            </Right>
        </SidebarHeader>
        <Link href="#">
            <SidebarLink>
                Best Sales
            </SidebarLink>
        </Link>
        <Link href="#">
            <SidebarLink>
                Category
            </SidebarLink>
        </Link>
        <Link href="#">
            <SidebarLink>
                New Products
            </SidebarLink>
        </Link>
        <Link href="#">
            <SidebarLink>
                Our Story
            </SidebarLink>
        </Link>
        <SidebarFooter>
            {
                
                Object.keys(auth).length === 0 
                ?
                <>
                <Link href="/user">
                    <BtnLink color={'white'} backgroundColor={'#357a38'} opacity={'0.6'} onClick={handleToggleSidebar}>Login</BtnLink>
                </Link>
                <Link href="/user">
                    <BtnLink onClick={handleToggleSidebar}>Register</BtnLink>
                </Link>
                </>
                : 
                <>
                <Link href="/profile">
                    <BtnLink color={'white'} backgroundColor={'#357a38'} opacity={'0.6'} onClick={handleToggleSidebar}>Account</BtnLink>
                </Link>
                
                <BtnLink onClick={handleLogout}>Logout</BtnLink>
                
                </>
            }
            
        </SidebarFooter>
       </SidebarWrapper>
    )
}

export default Sidebar