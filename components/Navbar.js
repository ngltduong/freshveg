import styled from "styled-components"
import { keyframes } from "styled-components"
import {
    Left,
    Center,
    Right
} from '../styles/Global.style'

import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall'
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SellIcon from '@mui/icons-material/Sell';
import CategoryIcon from '@mui/icons-material/Category';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { growth, Container } from '../styles/Global.style'

import Cookies from 'js-cookie'

import React, {useContext, useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { deleteItem } from '../store/Actions'
import {tablet, desktop} from '../utils/responsive'
import { DataContext } from '../store/GlobalState'

import NavBestSellItem from '../components/NavBestSellItem'

import { getData } from '../utils/fetchData'

// import LogoImg from '../public/img/FreshVegLogo.png'

const appearObj = keyframes`
    from{
        transform: translate(-100% ,0);
        opacity: 0;
    }
    to{
        transform: translate(-50%, 0);
        opacity: 1;
    }
`

const appearToTop = keyframes`
    from{
        transform: translateY(2%);
        opacity: 0;
        visibility: hidden;
    }
    to{
        transform: translateY(0px);
        opacity: 1;
        visibility: visible;

    }
`

const Nav = styled.nav`
    height: 90px;
    /* padding: 10px 20px; */
    width: 100%;
   
    background-color: hsla(45,15%,95%,.8);;
    /* background-color: transparent; */

    position: fixed;
    top:0;
    left: 12px;
    z-index: 10000;
    transition: background-color linear 0.2s;
    &.active{
        background-color: #fff;
        box-shadow:  0px 1px 4px 2.5px rgb(0 0 0 / 25%)
    }
`;

const NavLeft = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 26px;
`

const NavRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const NavCenter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    ${(desktop({
        flex: "2"
    }))}
`

const Logo = styled.div`
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 180px;
    height: 90px;
    flex: 1;
`

const LogoLeft = styled.div`
    ${Logo};
    display: none;
    ${(desktop({
        display: "block",   
        width: "100%",
        height: "100%"
    }))}
`

const LogoCenter = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    ${(desktop({
        display: "none"
    }))}
`

const LogoImg = styled.a`
    display: inline-block;
    position: absolute;
    height: 100%;
    width: 110px;
    background-image: url(/FreshVeg.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`


const Hamburger = styled.div`
    width: 20px;
    height: 20px;
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    -o-transition: .5s ease-in-out;
    transition: .5s ease-in-out;
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
        opacity: 1;
        left: 0;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
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
        left: 3px;
        opacity: 0;
    }
    
    &.open span:nth-child(2){
        width: 0%;
        opacity: 0;
    }
    &.open span:nth-child(3){
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        top: 16px;
        left: 3px;
        opacity: 0;
    }
   
    ${(desktop({
        display: "none"
    }))}

`

const NavMenuList = styled.ul`
    display: none;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    ${desktop({
        display: "flex",
        gap: "20px"
    })}

`

const NavMenuItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover{
        .subline
        {
            color:darkgreen;
        }
        .subline::after
        {
            display: block;
        }
        .PopupItem{
            visibility: visible;
            opacity: 1;
            pointer-events: all;
        }
    }

        .subline{
            font-size: 1.1rem;
            text-transform: uppercase;
            color: #014a28;
            font-weight: 600;
            position: relative;
            padding: 32px 0;
            cursor: pointer;
            display:inline-block;
            &::after{
                content: "";
                position: absolute;
                width: 100%;
                height: 3px;
                border-bottom: 4px solid green;
                display: none;
                top: 94%;
                left: 0;
            }
        }
   
`

const NavMenuPopup = styled.div`
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    /* padding-left: 12px; */
    /* padding-right: 12px; */
    background-color: #fff;
    padding-top: 48px;
    padding-bottom: 28px;
    box-shadow: 0px 6px 8.8px 0.1px rgb(0 0 0 / 30%);
    transform: translate(0px, 0px);
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
    will-change: visibility transform opacity;
    animation: ${appearToTop} 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
    &::after{
        content: "";
        position: absolute;
        top: -2%;
        left: 0;
        width: 100%;
        background-color: transparent;
        height: 50px;
    }
    &:hover{
        visibility: visible;
        opacity: 1;
    }
`

const SearchBtn = styled(SearchIcon)({
    display: "inline-block",
 },
    // tablet({display: "flex"})
 )

const User = styled(PersonIcon)({
    color: "darkgreen",
    fontSize: "1.8rem",
    marginLeft: "10px"
})

const CartCount = styled.span`
    font-size: 0.9rem;
    border-radius: 69.2%;
    top: -3.4px;
    position: absolute;
    right: -5px;
    color: white;
    background: #ed143d;
    display: flex;
    align-items: center;
    width: 1rem;
    justify-content: center;
    height: 1.1rem;
    z-index: 2;
    font-weight: 500;
    border: 1.4px solid white;
`

const CartWrapper = styled.div`
    position: relative;

    @media only screen and (min-width: 1023px){
        &:hover ~ #isPopup{
        display: block;
        }    
    }
    
`

const CartLink = styled.a`
    position: 'relative';
    cursor: pointer;
    
`

const UserIcon = styled.div`
    display: none;
`

const UserMenuItemLink = styled.a`
    display: flex; 
    align-items: center;
    &:hover{
        color: darkgreen;
    }
`

const UserMenuItem = styled(MenuItem)({
    "&:hover": {
        color: "darkgreen",
    }
})



const CartPopupWrapper = styled.div`
    position: absolute;
    width: 340px;
    top: calc(100% - 12px);
    right: 38px;
    display: none;
    background-color: #fff;
    border-radius: 2px;
    z-index: 10;
    padding: 12px 16px;
    box-shadow: 0 1px 4px #033a21b0;
    transform-origin: calc(100% - 12px) top;
    animation: ${growth} ease-in .2s;
    will-change: transform;
    &:before{
        content: "";
        position: absolute;
        top: -10px;
        right: 7px;
        width: 32px;
        height: 32px;
        width: 0;
        height: 0;
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-bottom: 10px solid white;
    }
    &:after{
        content: "";
        position: absolute;
        top: -22px;
        right: -2px;
        width: 45px;
        height: 32px;
        background: transparent;
    }
    &:hover {
        display: block;
    }

    
    
`
const CartPopupList = styled.ul`
    width: 100%;
    height: 40vh;
    padding: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
    width: 0.4em;
    };
    &::-webkit-scrollbar-track{
        box-shadow: inset 0 0 6px rgba(0,0,0,0.00);
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.00);
    };
    &::-webkit-scrollbar-thumb{
        background-color: rgba(0,0,0,.1);
        outline: 0px solid slategrey;
        border-radius: 6px;
    }
`

const CartPopupItem = styled.li`
    display: flex;
    width: 100%;
    padding: 4px;
    align-items: flex-start;
    & + & {
        padding-top: 20px;
        border-top: 1px solid #eee;
    }
`

const CartPopupImg = styled.img`
    width: 60px;
    height: 70px;
    border: 0px solid #eee;
    object-fit: contain;
    margin-right: 12px;
`

const CartPopupTitle = styled.h5`
    text-transform: capitalize;
    max-width: 202px;
    width: 100%;
    a{
        font-size: 16px;
        display: block;
        color: #00160cf5;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        transition: color linear 0.2s;
        &:hover{
            color: darkgreen;
            text-decoration: underline;
        }
    }
`


const CartPopupSubTitle = styled.div`
    cursor: pointer;
    &:hover{
        color: darkgreen;
    }
`

const CartPopupPrice = styled.span`
    color: red;
    font-weight: 500;
    font-size: 14px;
`
const CartPopupCount = styled.span`
    font-size: 14px;
`

const CartPopupFooter = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const CartTotalPrice = styled.h5`
    display: block;
    span{
        color: red;
    }
`

const CartCheckOutBtn = styled.a`
    font-size: 18px;
    display: inline-block;
    width: 100%;
    height: 36px;
    background-color: darkgreen;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-weight: 500;
    transition: all linear 0.2s;
    cursor: pointer;
    &:hover{
        color: #fff;
        opacity: 0.7;
    }
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    &.grid{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        grid-gap: 20px;
    }
    & .category-title{
        font-size: 1.2rem;
        line-height: 2rem;
    }
    & .category-link{
        font-size: 1.2rem;
        line-height: 2.4rem;
    }
    & .category-link:hover{
        color: #357a38;
        text-decoration: underline;
    }
    &.col-2-4{
        width: 100%;
        flex: 0 0 20%;
    }
    &.col-9-6{
        width: 100%;
        flex: 0 0 80%;
    }

`


function Navbar() {
    const router = useRouter()
    const {state, dispatch} = useContext(DataContext)
    const {auth, cart, scrollScreen, products, categories} = state
    const [anchorEl, setAnchorEl] = useState(null)
    const [popperHoverCart, setPopperHoverCart] = useState(null)
    
    const [isTransformHamburger, setIsTransformHamburger] = useState(false)

    const [navbar, setNavbar] = useState(false)

    const [total, setTotal] = useState(0)

    const [isDesktop, setIsDesktop] = useState(true)

    const [bestSellProducts, setBestSellProducts] = useState(null)

    const [navCategories, setNavCategories] = useState([])

    // const navBestItemPopup = useRef()

    // console.log(products)

    useEffect(() => {
        try{
            setBestSellProducts(products)
        }catch(err){
            console.log(err)
        }

    },[products])

    useEffect(() => {
        try{
            setNavCategories(categories)
        }catch(err){
            console.log(err)
        }

    },[categories])

    // const [products, setProducts] = useState([])

    const [blogs, setBlogs] = useState([])



    const open = Boolean(anchorEl);

    const changeBackground = () => {
        if(window.scrollY >= 90){
            setNavbar(true)
        }
        else{
            setNavbar(false)
        }
    }

    const handleSetLargeScreen = (window) => {
        if(window.innerWidth > 1023){
            setIsDesktop(true)
        }
        else{
            setIsDesktop(false)
        }
    }

    useEffect(()=> {
        window.addEventListener('scroll', changeBackground)
        
        window.addEventListener('resize',() => handleSetLargeScreen(window))

    })


    
    useEffect(() => {
        const offset = window
        handleSetLargeScreen(offset)

       
        // getData(`blog`)
        //     .then(res => {
        //       if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
              
        //       setBestSellProducts(res.blogs)
        //     })

        // getData(`categories`)
        //     .then(res => {
        //       if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
              
        //       setBestSellProducts(res.categories)
        //     })

    }, [])

    // console.log(products)

    useEffect(() => {
        const getTotal = () => {
            const res = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)
            setTotal(res)
        }
        getTotal()
    },[cart])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePopoverOpen = (event) => {
    setPopperHoverCart(event.currentTarget);
  };

  const handlePopoverClose = (event) => {
    setPopperHoverCart(null);
  };

  const isOpen = () =>{
      if(scrollScreen){
          return " open"
      }
      else return ""
  }

  const openPopper = Boolean(popperHoverCart);

  //check current page if true add class active to representative icon 
  const isActive = (r) =>{
    if(r === router.pathname){
        return " active"
    }
    else{
        return ""
    }
  }

  const handleNavExtendAppear = e =>{
    setIsTransformHamburger(!isTransformHamburger)
    dispatch({type: 'TOGGLE_SIDEBAR', payload: !scrollScreen})  
  }

  const handleLogout = () =>{
      Cookies.remove('refreshtoken', {path: 'api/auth/accessToken'})
      localStorage.removeItem('firstLogin')
      dispatch({type: 'AUTH', payload: {}})
      dispatch({type: 'NOTIFY', payload: {success: 'Logged out!'}})
      return router.push('/')
  }

  const loggedRouter = () => {
        return(
                // <li className="nav-item dropdown">
                    
                //         <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                //         <i className="fas fa-user"></i> {`${auth.user.fullname} ${auth.user.surname}`}
                //         </a>
                    
                //     <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                //         <li>
                //             <Link href="/profile">
                //                 <a className="dropdown-item">Profile</a>
                //             </Link>
                //         </li>
                //         {
                //             auth.user.role === 'admin' && adminRouter()
                //         }
                //         <div className="dropdown-divider"></div>
                //         <li>
                //             <button className="dropdown-item" onClick={handleLogout}>Log out</button>
                //         </li>
                //     </ul>
                // </li>
            <>
                <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>{auth.user.avatar}</Avatar>
                </IconButton>
                </Tooltip>
            
                <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                    overflow: 'visible',
                    width: '180px',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                <UserMenuItem>
                    <Link href="/users">
                        <UserMenuItemLink 
                        // style={{display: "flex", alignItems: "center"}}
                        > 
                        <PersonIcon sx={{fontSize: "24px"}}/> 
                        <span style={{marginLeft: "10px"}}>
                            Profile 
                        </span>  
                        </UserMenuItemLink>
                    </Link>
                </UserMenuItem>
                {
                    auth.user && auth.user.role === 'admin' && adminRouter()
                }
                <Divider />
                <UserMenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </UserMenuItem>
                </Menu>
            </>
        )
  }

  const adminRouter = () => {
      return(
          <div>
          <UserMenuItem>
              <Link href="/users">
                    <UserMenuItemLink 
                    // style={{display: "flex", alignItems: "center"}}
                    >
                        <ManageAccountsIcon sx={{fontSize: "24px"}}/>
                        <span style={{marginLeft: "10px"}}>
                            Setting Users  
                        </span>  
                        </UserMenuItemLink>
              </Link>
          </UserMenuItem>
          <UserMenuItem>
              <Link href="/create">
                  <UserMenuItemLink 
                //   style={{display: "flex", alignItems: "center"}}
                  >
                      <SellIcon sx={{fontSize: "24px"}}/>
                      <span style={{marginLeft: "10px"}}>
                      Products  
                        </span>  
                    </UserMenuItemLink>
              </Link>
          </UserMenuItem>
          <UserMenuItem>
              <Link href="/categories">
                  <UserMenuItemLink 
                //   style={{display: "flex", alignItems: "center"}}
                  >
                      <CategoryIcon sx={{fontSize: "24px"}}/>
                    <span style={{marginLeft: "10px"}}>
                        Categories  
                    </span>  
                 </UserMenuItemLink>
              </Link>
          </UserMenuItem>
          </div>
      )
  }

  return (
    
       <Nav className={navbar ? 'row active' : 'row'}>
           <Container style={{display: "flex"}} >
            {
                // isShownBestSellItem &&
                // ()
            }
           
           <NavLeft className="col col-1-3">
               <Hamburger className={isOpen()} onClick={handleNavExtendAppear}>
                   <span></span>
                   <span></span>
                   <span></span>
               </Hamburger>
               <LogoLeft>
                   <Link href="/">
                        <LogoImg />
                   </Link>
               </LogoLeft>
           </NavLeft>
           <NavCenter className="col col-1-3">
                <LogoCenter>
                   <Link href="/">
                        <LogoImg />
                   </Link>
                </LogoCenter>
               <NavMenuList>
                   <NavMenuItem>
                       <Link href="/">
                            <a 
                                // onMouseOver={() => setIsShownBestSellItem(true)}
                                // onMouseOut={(e) => {
                                //     (!navBestItemPopup.current || e.target) && 
                                //     setIsShownBestSellItem(false)
                                // }}
                                className="subline"
                            >Best Seller
                            </a>                    
                       </Link>
                       <NavMenuPopup 
                        className="PopupItem"
                        // onMouseEnter={() => setIsShownBestSellItem(true)}
                        // onMouseLeave={() => setIsShownBestSellItem(false)}
                        // ref={node => navBestItemPopup.current = node}
                        >
                        <Container className="navPopup">
                            {
                                
                                bestSellProducts === null ?
                                <></>
                                :
                                bestSellProducts.sort((a, b) => b.sort - a.sort).filter((product, index) => index <= 3).map(product => (
                                    <NavBestSellItem key={product._id} product={product}/>
                                ))
                            }
                        </Container>
                    </NavMenuPopup>
                   </NavMenuItem>
                   <NavMenuItem>
                        <Link href="/">
                                <a
                                    className="subline"
                                >Shop</a>                    
                        </Link>
                        <NavMenuPopup 
                            className="PopupItem"

                        >
                        <Container className="flex">
                            <Column
                                className="col-2-4"
                            >
                                <h2 className="category-title">CATEGORY</h2>
                                {
                                    navCategories === null ?
                                    <></>
                                    :
                                    navCategories.map(category => (
                                        <Link key={category._id} href={`/products?category=${category._id}`}>
                                            <a  className="category-link">{category.name}</a>
                                        </Link>
                                    ))
                                }
                            </Column>
                            <Column
                                className="col-9-6 grid"
                            >
                                {
                                
                                bestSellProducts === null ?
                                <></>
                                :
                                bestSellProducts.filter((product, index) => index <= 3).map(product => (
                                    <NavBestSellItem key={product._id} product={product}/>
                                ))
                                }
                            </Column>
                            </Container>
                        </NavMenuPopup>
                   </NavMenuItem>
                   <NavMenuItem>
                       <Link href="/">
                            <a
                                className="subline"
                            >Our Story</a>                    
                       </Link>
                   </NavMenuItem>
                   <NavMenuItem>
                       <Link href="/">
                            <a
                                className="subline"
                            >Contact</a>                    
                       </Link>
                   </NavMenuItem>
               </NavMenuList>
           </NavCenter>
           <NavRight className="col col-1-3">
               <SearchBtn 
               style={{color: "darkgreen", fontSize: "1.8rem", cursor: "pointer"}}
               
               />
               <CartWrapper>
                <Link href="/cart">
                    <CartLink  style={{position: 'relative'}} className={isActive('/cart')}
                    >
                        <LocalMallIcon  style={{color: "darkgreen", fontSize: "1.8rem", marginLeft: "10px"}}/>
                        <CartCount>{cart.length}</CartCount>
                    </CartLink>
                </Link>
                </CartWrapper>
                <CartPopupWrapper id="isPopup">
                            <CartPopupList>
                            {
                                cart.length === 0 
                                ? <h3>Giỏ hàng trống</h3>
                                :
                                cart.map(item => (
                                    <CartPopupItem key={item.id}>
                                        <CartPopupImg 
                                            src={item.images[0].url} 
                                            alt={item.images[0].url}
                                        />
                                        <CartPopupTitle>
                                            <Link href={`/products/item/${item.slug}`}>
                                                <a>{item.title}</a>
                                            </Link>
                                            <CartPopupPrice>{item.quantity * item.price}</CartPopupPrice>
                                            <CartPopupCount>
                                            {
                                                item.inStock > 0
                                                ? <p className="mb-1 text-danger">In Stock: {item.inStock}</p>
                                                : <p className="mb-1 text-danger">Out Stock</p>
                                            }
                                            </CartPopupCount>
                                        </CartPopupTitle>
                                        <CartPopupSubTitle>
                                            <CloseIcon
                                            onClick={() => dispatch(deleteItem(cart, item._id, 'ADD_CART'))}
                                            />
                                        </CartPopupSubTitle>
                                    </CartPopupItem>
                                ))
                            }
                            </CartPopupList>
                        <CartPopupFooter>
                            <CartTotalPrice>Subtotal:
                                <span> ${total}</span>    
                            </CartTotalPrice>
                        
                            <Link href="/cart">        
                                <CartCheckOutBtn>
                                    View Bag
                                </CartCheckOutBtn>
                            </Link>
                        </CartPopupFooter>
                        </CartPopupWrapper>        
                    
                {
                    Object.keys(auth).length === 0 ?
                    <UserIcon>
                    <Link href="/user">
                        <a className={isActive('/user')} >
                            <User/>
                        </a>
                    </Link>
                    </UserIcon>
                    : loggedRouter()
                }
                
           </NavRight>
           </Container>  
       </Nav>


//     <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
//         <div className="container-fluid">
//         <Link href="/">
//         <a className="navbar-brand">FreshVeg</a>
//         </Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                     <Link href="/cart">
//                     <a className={"nav-link" + isActive('/cart')} ><i className="fas fa-shopping-cart position-relative">
//                         <span 
//                         className="position-absolute"
//                         style={{
//                             fontSize: '0.8rem',
//                             padding: '3px 6px',
//                             borderRadius: '50%',
//                             top: '-10px',
//                             right: '-10px',
//                             color: 'white',
//                             background: '#ed143dc2'
//                         }}>
                        
//                             {cart.length}</span>
//                         </i></a>
//                     </Link>
//                 </li>
//                 {/* <li className="nav-item">
//                     <Link href="/user">
//                     <a className={"nav-link" + isActive('/user')} ><i className="fas fa-user"></i></a>
//                     </Link>
//                 </li> */}
//                 {
//                     Object.keys(auth).length === 0 ?
//                     <li className="nav-item">
//                         <Link href="/user">
//                             <a className={"nav-link" + isActive('/user')} >
//                                 <i className="fas fa-user"></i>
//                             </a>
//                         </Link>
//                     </li>
//                     : loggedRouter()
//                 }

               
//             </ul>
//             <form className="d-flex">
//             <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//             <button className="btn btn-outline-success" type="submit">Search</button>
//             </form>
//         </div>
//         </div>
//   </nav>
  );
}


export default Navbar;
