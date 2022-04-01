import Head from 'next/head'
import Link from 'next/link'
import { useState, useContext, useEffect } from 'react'
import styles from './User.module.css'
import {validRegister} from '../../utils/valid'
import {DataContext} from '../../store/GlobalState'
import {postData} from '../../utils/fetchData'
import Cookie from 'js-cookie'
import {useRouter} from 'next/router'

const User = () =>{
    const registerForm = "registerForm"
    // const formNotify = "form-notify"
    // const formGroup = "form-group"

    //Register Declaration
    const initialStateRegister = {fullname: '', surname: '',email: '', password: '', phone: ''}
    const [toggleShowForgetPass, setToggleShowForgetPass] = useState(true)
    const [userData, setUserData] = useState(initialStateRegister)
    const {fullname, surname, email, password, phone} = userData

    //Signin Declaration
    const initialStateSignIn = {emailSignIn: '', passwordSignIn: ''}
    const [userDataSignIn, setUserDataSignIn] = useState(initialStateSignIn)
    const {emailSignIn, passwordSignIn} = userDataSignIn


    const {state, dispatch} = useContext(DataContext)
    const { auth } = state

    const router = useRouter()

    const handleToggleShowForgetPass = () =>{
        setToggleShowForgetPass(!toggleShowForgetPass);
    }

    const handleChangeSignInInput = e =>{
        const {name, value} = e.target
        setUserDataSignIn({...userDataSignIn, [name]: value})
        dispatch({type: 'NOTIFY', payload: {} })
    }


    const handleChangeInput = e =>{
        const {name, value} = e.target
        setUserData({...userData, [name]: value})
        dispatch({type: 'NOTIFY', payload: {} })
    }

    const handleRegisterFormSubmit = async e =>{
        e.preventDefault()
        const errorMsg = validRegister(fullname, surname, email, password, phone)
        if(errorMsg) return dispatch({type: 'NOTIFY', payload: {error: errorMsg}})

        dispatch({type: 'NOTIFY', payload: {loading: true}})
        
        const res = await postData('auth/register', userData)

        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
    }

    const handleSignInFormSubmit = async e =>{
        e.preventDefault()
        // const errorMsg = validRegister(fullname, surname, email, password, phone)
        // if(errorMsg) return dispatch({type: 'NOTIFY', payload: {error: errorMsg}})

        dispatch({type: 'NOTIFY', payload: {loading: true}})
        
        const res = await postData('auth/login', userDataSignIn)

        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

        dispatch({type: 'NOTIFY', payload: {success: res.msg}})

        dispatch({type: 'AUTH', payload: {
            token: res.access_token,
            user: res.user
        }})

        Cookie.set('refreshtoken', res.refresh_token,{
             path: 'api/auth/accessToken',
            expires: 7
        })

        localStorage.setItem('firstLogin', true)
    }

    useEffect(()=>{
        if(Object.keys(auth).length !== 0) router.push("/")
    }, [auth])

    return (
        <>
        <Head>
            <title>User Page</title>
        </Head>
            <div className="container">
                <div className={styles.topSpacing}>
                    <div className="row">
                        <div className="col">
                            <form className={toggleShowForgetPass ? styles.show : styles.disable} method="post" action="" onSubmit={handleSignInFormSubmit}>
                                <div className="mx-auto text-center text-uppercase form-title fs-5 mb-3" style={{maxWidth: '200px'}}>Đăng nhập</div>
                                    <div className="input-group mb-3">
                                    <span className="input-group-text" id="signinEmailAddon"><i className="fa-solid fs-4 fa-envelope"></i></span>
                                    <input onChange={handleChangeSignInInput} value={emailSignIn} name="emailSignIn" type="email" className={styles.spaceInput + " form-control"} id="signinEmail" aria-describedby="signinEmail" placeholder="Email của bạn"/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="signinPasswordAddon"><i className="fa-solid fs-4 fa-lock"></i></span>
                                        <input onChange={handleChangeSignInInput} value={passwordSignIn} name="passwordSignIn" type="password" className={styles.spaceInput + " form-control"} id="signinPassword" placeholder="Nhập mật khẩu"/>
                                    </div>
                                
                                <button type="submit" className="btn btn-outline-secondary pt-2 pb-2 w-100">Đăng nhập</button>
                                <p className="mx-auto gray-900 text-center mt-5" 
                                    style={{fontWeight: '500',
                                            textDecoration: "underline", 
                                            maxWidth: '200px', 
                                            cursor: 'pointer'}}
                                    onClick={handleToggleShowForgetPass}
                                    >
                                            Quên mật khẩu?</p>
                            </form>
                                
                            <form className={toggleShowForgetPass ? styles.disable : styles.show}>
                                <div className="form-title" style={{maxWidth: '200px', marginBottom: '22px'}}><i className="fas fa-sync-alt"></i> Quên mật khẩu</div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="signinEmailAddon"><i className="fa-solid fs-4 fa-envelope"></i></span>
                                    <input type="email" className={styles.spaceInput + " form-control"} id="forgetEmailInput" aria-describedby="forgetEmailHelp" placeholder="Nhập email của bạn"/>
                                </div>
                                <button type="submit" className="btn btn-outline-secondary pt-2 pb-2 w-100">Gửi</button>
                                <p className="mx-auto text-center gray-900 mt-5" 
                                    style={{fontWeight: '500',
                                            textDecoration: "underline", 
                                            maxWidth: '200px', 
                                            cursor: 'pointer'}}
                                    onClick={handleToggleShowForgetPass}
                                    >
                                            Hủy</p>
                            </form>

                        </div>
                        <div className="col">
                        <form id={registerForm} className={registerForm} onSubmit={handleRegisterFormSubmit} method="post" action="" >
                            <div className="mx-auto text-center text-uppercase text-nowrap form-title fs-5 mb-3" style={{maxWidth: '300px'}}>Đăng ký thành viên mới</div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="registerFullnameInputAddon"><i className="fa-solid fs-4 fa-user"></i></span>
                                    <input onChange={handleChangeInput} value={fullname} name="fullname" type="text" className={styles.spaceInput + " form-control"} id="registerFullnameInput" placeholder="Tên"/>
                                    <span className="form-notify"></span>
                                </div>
                           
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="registerSurnameInputAddon"><i className="fa-solid fs-4 fa-user"></i></span>
                                    <input onChange={handleChangeInput} value={surname} name="surname" type="text" className={styles.spaceInput + " form-control"} id="registerSurnameInput" placeholder="Họ"/>
                                    <span className="form-notify"></span>
                                </div>
                            
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="registerEmailInputAddon"><i className="fa-solid fs-4 fa-envelope"></i></span>
                                    <input onChange={handleChangeInput} value={email} name="email" type="email" className={styles.spaceInput + " form-control"} id="registerEmailInput" placeholder="Email của bạn"/>
                                    <span className="form-notify"></span>
                                </div>
                            
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="registerPhoneInputAddon"><i className="fa-solid fs-4 fa-phone"></i></span>
                                    <input onChange={handleChangeInput} value={phone} name="phone" type="text" className={styles.spaceInput + " form-control"} id="registerPhoneInput" placeholder="Số điện thoại"/>
                                    <span className="form-notify"></span>
                                </div>
                        
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="registerPasswordAddon"><i className="fa-solid fs-4 fa-lock"></i></span>
                                    <input onChange={handleChangeInput} value={password} name="password" type="password" className={styles.spaceInput + " form-control"} id="registerPassword" placeholder="Nhập mật khẩu"/>
                                    <span className="form-notify"></span>
                                </div>
                           
                            <button type="submit" className="btn btn-outline-secondary pt-2 pb-2 w-100">Đăng ký</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
           
            
        </>

    )
}

export default User