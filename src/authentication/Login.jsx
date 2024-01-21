import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faPinterest } from '@fortawesome/free-brands-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import login from './login.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {

  return (
    <div className={login.container} dir='rtl'>
      <div className={login.secondHalf}>
        <button className={login.FBtn}
        >تسجيل الدخول</button>
        <Link to='/signup'>
          <button className={login.LBtn}>انشاء حساب</button>
        </Link>
      </div>
      <div className={login.leftHalf}>
        <form className={login.loginForm}>
          <h1 className={login.heading}>Smart Shop</h1>
          <h2 className={login.formLable}>تسجيل الدخول</h2>
          <p className={login.instruction}>تسجيل الدخول للمتابعة في موقعنا</p>
          <div className={login.inputFields}>
            <div className={login.cont}>
              <input className={login.emailField} type='text' placeholder='البريد الالكتروني' ></input>
              <FontAwesomeIcon className={login.icon} icon={faEnvelope} />
            </div>
            <div className={login.cont}>
              <input className={login.passField} type='password' placeholder='كلمة المرور' />
              <FontAwesomeIcon className={login.icon} icon={faLock} />
            </div>
          </div>
          <div className={login.otherAttr}>
            <button className={login.loginBtn}>تسجيل الدخول</button>
            <a href='#'>هل نسيت كلمة المرور؟</a>
          </div>
          <p>او سجل الدخول عبر:</p>
          <div className={login.socialMediaIcons}>
            <FontAwesomeIcon className={login.socialIcon} icon={faTwitter} />
            <FontAwesomeIcon className={login.socialIcon} icon={faFacebookF} />
            <FontAwesomeIcon className={login.socialIcon} icon={faPinterest} />
            <FontAwesomeIcon className={login.socialIcon} icon={faLinkedinIn} />
          </div>
        </form>
      </div>

    </div>
  )
}