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
import { useDispatch } from 'react-redux'
import axios from 'axios'

export const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [accept, setAccept] = useState(false)
  const [reqNam, setReqName] = useState(false)
  const [emailcheck, setEmailcheck] = useState(false)
  const [emailError, setEmailError] = useState("")


  async function submit(e) {
    let flag = true;
    e.preventDefault();
    setAccept(true)
    setReqName(true)
    setEmailcheck(true)
    if (name === "" || password.length < 8) {
      flag = false;
    } else flag = true;
    try {
      if (flag) {
        const res = await axios.post("http://localhost:3000", {
          name: name,
          email: email,
          password: password
        }).then((t) => console.log(t))
      }
    } catch (err) {
      setEmailError(err.response.status)
    }
  }
  // const dispatch = useDispatch();

  // const handleInputChange = (e) => {
  //   const userName = e.target.value;
  //   dispatch(loginUser(user));
  // };

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
        <form className={signup.signupForm} onSubmit={submit}>
          <h1 className={signup.heading}>Smart Shop</h1>
          <h2 className={signup.formLable}>انشاء حساب</h2>
          <p className={signup.instruction}>انشئ حساب مجاني واستمتع به</p>
          <div className={signup.inputFields}>
            <div className={signup.cont}>
              <input className={signup.userField} type='text' placeholder='الاسم' value={name} onChange={(e) => setName(e.target.value)}></input>
              <FontAwesomeIcon className={signup.icon} icon={faUser} />
              {name === "" && reqNam && <p>↪Username Is Required</p>}
            </div>
            <div className={signup.cont}>
              <input className={signup.emailField} type='text' placeholder='البريد الالكتروني' value={email} onChange={(e) => setEmail(e.target.value)} required></input>
              <FontAwesomeIcon className={signup.icon} icon={faEnvelope} />
              {emailcheck && emailError === 422 && <p>↪Email Is Already Used</p>}
            </div>
            <div className={signup.cont}>
              <input className={signup.passField} type='password' placeholder='كلمة المرور' value={password} onChange={(e) => setPassword(e.target.value)} />
              <FontAwesomeIcon className={signup.icon} icon={faLock} />
              {password.length < 8 && accept && <p>↪Password must be more than 8 charactar</p>}
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