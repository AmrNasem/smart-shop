import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import signed from './SignedinUser.module.css'

export const UserSigned = () => {
  return (
    <div className={signed.test}>
      <div className={signed.container} dir='rtl'>
        <div className={signed.above}>
          <FontAwesomeIcon icon={faCircleUser} />
          <div>
            <h3> { }مرحبًا</h3>
            <p>{ }</p>
          </div>
        </div>
      </div>
    </div>
  )
}