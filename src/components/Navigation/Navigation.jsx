import { NavLink } from 'react-router-dom'
import './Navigation.css'

function Navigation({
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  isLoggedIn,
  currentUser,
}) {
  return (
    <nav className="navigation" aria-label="Main navigation">
      <NavLink className="navigation__logo" to="/">
        NewsExplorer
      </NavLink>

      <div className="navigation__links">
        <NavLink
          className={({ isActive }) =>
            `navigation__link ${isActive ? 'navigation__link_active' : ''}`
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `navigation__link ${isActive ? 'navigation__link_active' : ''}`
          }
          to="/saved-news"
        >
          Saved news
        </NavLink>
        {isLoggedIn ? (
          <>
            <span className="navigation__user">{currentUser?.name}</span>
            <button className="navigation__button" type="button" onClick={onLogoutClick}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <button className="navigation__button" type="button" onClick={onLoginClick}>
              Sign in
            </button>
            <button
              className="navigation__button navigation__button_secondary"
              type="button"
              onClick={onRegisterClick}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navigation
