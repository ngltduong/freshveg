import React, {useContext} from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState';
import Cookies from 'js-cookie';

function Navbar() {
  const router = useRouter()
  const {state, dispatch} = useContext(DataContext)
  const {auth, cart} = state
  //check current page if true add class active to representative icon 
  const isActive = (r) =>{
    if(r === router.pathname){
        return " active"
    }
    else{
        return ""
    }
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
                <li className="nav-item dropdown">
                    
                        <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-user"></i> {`${auth.user.fullname} ${auth.user.surname}`}
                        </a>
                    
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <Link href="/profile">
                                <a className="dropdown-item">Profile</a>
                            </Link>
                        </li>
                        {
                            auth.user.role === 'admin' && adminRouter()
                        }
                        <div className="dropdown-divider"></div>
                        <li>
                            <button className="dropdown-item" onClick={handleLogout}>Log out</button>
                        </li>
                    </ul>
                </li>
        )
  }

  const adminRouter = () => {
      return(
          <>
          <li>
              <Link href="/users">
                  <a className="dropdown-item">Users</a>
              </Link>
          </li>
          <li>
              <Link href="/create">
                  <a className="dropdown-item">Products</a>
              </Link>
          </li>
          <li>
              <Link href="/categories">
                  <a className="dropdown-item">Categories</a>
              </Link>
          </li>
          </>
      )
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
                    <a className={"nav-link" + isActive('/cart')} ><i className="fas fa-shopping-cart position-relative">
                        <span 
                        className="position-absolute"
                        style={{
                            fontSize: '0.8rem',
                            padding: '3px 6px',
                            borderRadius: '50%',
                            top: '-10px',
                            right: '-10px',
                            color: 'white',
                            background: '#ed143dc2'
                        }}>
                        
                            {cart.length}</span>
                        </i></a>
                    </Link>
                </li>
                {/* <li className="nav-item">
                    <Link href="/user">
                    <a className={"nav-link" + isActive('/user')} ><i className="fas fa-user"></i></a>
                    </Link>
                </li> */}
                {
                    Object.keys(auth).length === 0 ?
                    <li className="nav-item">
                        <Link href="/user">
                            <a className={"nav-link" + isActive('/user')} >
                                <i className="fas fa-user"></i>
                            </a>
                        </Link>
                    </li>
                    : loggedRouter()
                }

               
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
