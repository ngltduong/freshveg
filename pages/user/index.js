import Head from 'next/head'
import Link from 'next/link'
import { useState, useContext } from 'react'
import styles from './User.module.css'
import validate from '../../utils/valid'
import {DataContext} from '../../store/GlobalState'
import {postData} from '../../utils/fetchData'
const User = () =>{
    const registerForm = "registerForm"
    // const formNotify = "form-notify"
    // const formGroup = "form-group"
    const initialState = {fullname: '', surname: '',email: '', password: '', phone: ''}
    const [toggleShowForgetPass, setToggleShowForgetPass] = useState(true)
    const [userData, setUserData] = useState(initialState)
    const {fullname, surname, email, password, phone} = userData
    const {state, dispatch} = useContext(DataContext)
    const handleToggleShowForgetPass = () =>{
        // toggleShowForgetPass === '' ? setToggleShowForgetPass('show') : setToggleShowForgetPass('')
        setToggleShowForgetPass(!toggleShowForgetPass);
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setUserData({...userData, [name]: value})
        dispatch({type: 'NOTIFY', payload: {} })
    }

    const handleFormSubmit = async e =>{
        e.preventDefault()
        const errorMsg = validate(fullname, surname, email, password, phone)
        if(errorMsg) return dispatch({type: 'NOTIFY', payload: {error: errorMsg}})

        dispatch({type: 'NOTIFY', payload: {loading: true}})
        
        const res = await postData('auth/register', userData)

        if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
    }

    return (
        <>
        <Head>
            <title>User Page</title>
        </Head>
            <div className="container">
                <div className={styles.topSpacing}>
                    <div className="row">
                        <div className="col">
                            <form className={toggleShowForgetPass ? styles.show : styles.disable}>
                                <div className="mx-auto text-center text-uppercase form-title fs-5 mb-3" style={{maxWidth: '200px'}}>Đăng nhập</div>
                                    <div className="input-group mb-3">
                                    <span className="input-group-text" id="signinEmailAddon"><i className="fa-solid fs-4 fa-envelope"></i></span>
                                    <input type="email" className={styles.spaceInput + " form-control"} id="signinEmail" aria-describedby="signinEmail" placeholder="Email của bạn"/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="signinPasswordAddon"><i className="fa-solid fs-4 fa-lock"></i></span>
                                        <input type="password" className={styles.spaceInput + " form-control"} id="signinPassword" placeholder="Nhập mật khẩu"/>
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
                                <div className="form-title mb-3" style={{maxWidth: '200px'}}><i className="fas fa-sync-alt"></i> Quên mật khẩu</div>
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
                        <form id={registerForm} className={registerForm} onSubmit={handleFormSubmit} method="post" action="" >
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