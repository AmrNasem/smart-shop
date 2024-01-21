import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faPinterest } from '@fortawesome/free-brands-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import signup from './Signup.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const Signup = () => {

  return (
    <div className={signup.container} dir='rtl'>
      <div className={signup.secondHalf}>
        <Link to='/login'>
          <button className={signup.FBtn}
          >تسجيل الدخول</button>
        </Link>
        <button className={signup.LBtn}>انشاء حساب</button>
      </div>
      <div className={signup.leftHalf}>
        <form className={signup.signupForm}>
          <h1 className={signup.heading}>Smart Shop</h1>
          <h2 className={signup.formLable}>انشاء حساب</h2>
          <p className={signup.instruction}>انشئ حساب مجاني واستمتع به</p>
          <div className={signup.inputFields}>
            <div className={signup.cont}>
              <input className={signup.userField} type='text' placeholder='الاسم'></input>
              <FontAwesomeIcon className={signup.icon} icon={faUser} />
            </div>
            <div className={signup.cont}>
              <input className={signup.emailField} type='text' placeholder='البريد الالكتروني'></input>
              <FontAwesomeIcon className={signup.icon} icon={faEnvelope} />
            </div>
            <div className={signup.cont}>
              <input className={signup.passField} type='password' placeholder='كلمة المرور' />
              <FontAwesomeIcon className={signup.icon} icon={faLock} />
            </div>
          </div>
          <div className={signup.otherAttr}>
            <button className={signup.signupBtn} type='submit'>انشاء حساب</button>
            <a href='#'>هل نسيت كلمة المرور؟</a>
          </div>
          <p>او سجل الدخول عبر:</p>
          <div className={signup.socialMediaIcons}>
            <FontAwesomeIcon className={signup.socialIcon} icon={faTwitter} />
            <FontAwesomeIcon className={signup.socialIcon} icon={faFacebookF} />
            <FontAwesomeIcon className={signup.socialIcon} icon={faPinterest} />
            <FontAwesomeIcon className={signup.socialIcon} icon={faLinkedinIn} />
          </div>
        </form>
      </div>
    </div>
  )
}