import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faPinterest } from '@fortawesome/free-brands-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import login from './login.module.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../Componentes/Store/authSlice'
import Swal from 'sweetalert2'

export const Login = () => {
  let flag = true;
  let access = false;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailcheck, setEmailcheck] = useState(false)
  const [accept, setAccept] = useState(false)
  const [passwordChecking, setPasswordChecking] = useState(false);
  const navigate = useNavigate();

  if (password.length === "" || email === "") {
    flag = false;
  } else flag = true;

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setAccept(true)
    setEmailcheck(true)

    try {
      if (flag) {
        var response = await axios.get("http://localhost:3100/users", {
          email: email,
          password: password,
        }).then()
        var user = response.data.find((u) => u.email === email && u.password === password);
        var emailChecking = response.data.find((u) => u.email === email) ? false : true;
      }
      console.log(user)
      if (flag && user) {
        console.log('Login successful!');
        dispatch(loginUser(user))
        access = true;
        navigate('/home')
      } else {
        console.log('Login failed!');
        emailChecking && email !== "" && Swal.fire("Email not Found, Signup First!");
        setPasswordChecking(response.data.find((u) => u.email === email && u.password !== password && password !== ""));
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
  function hideEmailMessage() {
    setEmailcheck(false)
  }
  function hidePassMessage() {
    setPasswordChecking(false)
    setAccept(false);
  }

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
        <form className={login.loginForm} onSubmit={handleLogin}>
          <h1 className={login.heading}>Smart Shop</h1>
          <h2 className={login.formLable}>تسجيل الدخول</h2>
          <p className={login.instruction}>تسجيل الدخول للمتابعة في موقعنا</p>
          <div className={login.inputFields}>
            <div className={login.cont}>
              <input className={login.emailField} type='email' placeholder='البريد الالكتروني' value={email} onChange={(e) => setEmail(e.target.value)} onFocus={hideEmailMessage}></input>
              <FontAwesomeIcon className={login.icon} icon={faEnvelope} />

            </div>
            {emailcheck && email === "" && <p style={{ margin: "5px", color: "#a00" }}>E-mail is Required↪</p>}
            <div className={login.cont}>
              <input className={login.passField} type='password' placeholder='كلمة المرور' value={password}
                onChange={(e) => setPassword(e.target.value)} onFocus={hidePassMessage} />
              <FontAwesomeIcon className={login.icon} icon={faLock} />
            </div>
            {accept && password === "" && <p style={{ margin: "5px", color: "#a00" }}>Invalid Password↪</p> ||
              passwordChecking && <p style={{ margin: "5px", color: "#a00" }}>Wronge Password, Please try again↪</p>}
          </div>
          <div className={login.otherAttr}>
            <button className={login.loginBtn} type='submit'>تسجيل الدخول</button>
            <a href='#'>هل نسيت كلمة المرور؟</a>
          </div>
          <p className={login.p}>او سجل الدخول عبر:</p>
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