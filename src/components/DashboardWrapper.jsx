import { Link } from "react-router-dom";
import style from './DashboardWrapper.module.css';

const DashboardWrapper = ({ children }) => {
  return (
    <div>
      <nav className={style.nav}>
        <div className={style.logo}>Logotipo</div>
        <Link to={'/dashboard'}>Links</Link>
        <Link to={'/dashboard/profile'}>Profile</Link>
        <Link to={'/signout'}>Signout</Link>
      </nav>
      <div className="main-container">{children}</div>
    </div>
  )
}

export { DashboardWrapper };
