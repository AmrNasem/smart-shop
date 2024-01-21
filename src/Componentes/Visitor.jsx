import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import visitor from './Visitor.module.css'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

export const Visitor = () => {
  return (
    // remove the test div
    <div className={visitor.test}>
      <div className={visitor.container} dir='rtl'>
        <div className={visitor.child1}>
          <FontAwesomeIcon icon={faUser} />
          <Link to="/login">
            <p className={visitor.signinOp}>تسجيل الدخول</p>
          </Link>
        </div>
        <div className={visitor.child2}>
          <FontAwesomeIcon icon={faUser} />
          <Link to="/signup">
            <p className={visitor.signupOp}>تسجيل جديد</p>
          </Link>
        </div>
      </div>
    </div >
  )
}