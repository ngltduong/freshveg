import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import '../styles/User.module.css'
const User = () =>{
    const [toggleShowForgetPass, setToggleShowForgetPass] = useState('')

    const handleToggleShowForgetPass = () =>{
        toggleShowForgetPass === '' ? setToggleShowForgetPass('show') : setToggleShowForgetPass('')
    }

    return (
        <>
        <Head>
            <title>User Page</title>
        </Head>
            <div className="row">
                <div className="col">
                    <form className={toggleShowForgetPass}>
                        <div className="mx-auto form-title" style={{maxWidth: '200px'}}>Đăng nhập</div>
                        <div className="mb-3 mt-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email của bạn</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Nhập mật khẩu</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Đăng nhập</button>
                        <p className="mx-auto gray-900" 
                            style={{fontWeight: '500',
                                    textDecoration: "underline", 
                                    maxWidth: '200px', 
                                    cursor: 'pointer'}}
                            onClick={handleToggleShowForgetPass}
                            >
                                    Quên mật khẩu?</p>
                    </form>
                </div>
                <div className="col">
                <form>
                    <div className="mx-auto form-title" style={{maxWidth: '200px'}}>Đăng ký thành viên mới</div>
                    <div className="mb-3 mt-4">
                        <label htmlFor="inputEmail" className="form-label">Tên</label>
                        <input type="email" className="form-control" id="inputEmail" name="inputEmail" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Tên</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Họ</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Số điện thoại</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Nhập mật khẩu</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Đăng ký</button>
                </form>
                </div>
            </div>
            
        </>

    )
}

export default User