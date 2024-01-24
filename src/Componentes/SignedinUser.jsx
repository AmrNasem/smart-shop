import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import signed from './SignedinUser.module.css'
import { useSelector } from 'react-redux'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export const UserSigned = () => {
  const userName = useSelector(state => state.auth.user.name)
  const email = useSelector(state => state.auth.user.email)

  console.log(userName)
  console.log(email)
  return (
    <div className={signed.container} dir='rtl'>
      <div className={signed.above}>
        <FontAwesomeIcon icon={faCircleUser} className={signed.userLogo} />
        <div className={signed}>
          <p>{userName}</p>
          <p>{email}</p>
        </div>
      </div>
      <div className={signed.hr}></div>
      <div className={signed.down}>
        <div className={signed.horzintal}>
          <FontAwesomeIcon icon={faSliders} />
          <p>لوحة التحكم</p>
        </div>
        <div className={signed.horzintal}>
          <FontAwesomeIcon icon={faCircleUser} />
          <p>تفاصيل الحساب</p>
        </div>
        <div className={signed.horzintal}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          <p>تسجيل الخروج</p>
        </div>
      </div>
    </div>
  )
}