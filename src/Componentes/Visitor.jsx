import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import visitor from './Visitor.module.css'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

export const Visitor = () => {
  return (
    <div className={visitor.container} dir='rtl'>
      <Link to="/login" className={visitor.child1}>
        <FontAwesomeIcon icon={faUser} />
        <p className={visitor.signinOp}>تسجيل الدخول</p>
      </Link>
      <Link to="/signup" className={visitor.child2}>
        <FontAwesomeIcon icon={faUser} />
        <p className={visitor.signupOp}>تسجيل جديد</p>
      </Link>
    </div>
  )
}