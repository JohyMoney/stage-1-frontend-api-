import Navigation from '../Navigation/Navigation.jsx'
import './Header.css'

function Header({
  title,
  subtitle,
  children,
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  isLoggedIn,
  currentUser,
}) {
  return (
    <header className="header content-section">
      <Navigation
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogoutClick={onLogoutClick}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />
      <div className="header__content">
        <p className="header__title">{title}</p>
        <h1 className="header__subtitle">{subtitle}</h1>
      </div>
      {children}
    </header>
  )
}

export default Header
