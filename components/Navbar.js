import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'

function Navbar() {
  const router = useRouter()
  //check current page if true add class active to representative icon 
  const isActive = (r) =>{
    if(r === router.pathname){
        return " active"
    }
    else{
        return ""
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
        <Link href="/">
        <a className="navbar-brand">FreshVeg</a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link href="/cart">
                <a className={"nav-link" + isActive('/cart')} ><i className="fas fa-shopping-cart"></i></a>
                </Link>
            </li>
            <li className="nav-item">
                <Link href="/user">
                <a className={"nav-link" + isActive('/user')} ><i className="fas fa-user"></i></a>
                </Link>
            </li>


            {/* <li className="nav-item dropdown">
                <Link href="/user">
                    <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-user"></i>
                    </a>
                </Link>  
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                    <Link href="/profile">
                        <a className="dropdown-item">Profile</a>
                    </Link>
                </li>
                <li>
                    <Link href="/logout">
                        <a className="dropdown-item">Log out</a>
                    </Link>
                </li>
                </ul>
            </li> */}
            </ul>
            <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
        </div>
  </nav>
  );
}

export default Navbar;
