import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function ProtectedRoute({ isLoggedIn, onUnauthorized, children }) {
  const location = useLocation()

  useEffect(() => {
    if (!isLoggedIn) {
      onUnauthorized()
    }
  }, [isLoggedIn, onUnauthorized])

  if (!isLoggedIn) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
