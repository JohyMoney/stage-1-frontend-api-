import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/HomePage.jsx'
import SavedNewsPage from '../../pages/SavedNewsPage.jsx'
import LoginModal from '../LoginModal/LoginModal.jsx'
import RegisterModal from '../RegisterModal/RegisterModal.jsx'
import { getToken, getUserByToken, login, logout, register } from '../../utils/AuthApi.js'
import {
  deleteArticle,
  getSavedArticles,
  saveArticle,
} from '../../utils/SavedArticlesApi.js'
import './App.css'

function App() {
  const [activeModal, setActiveModal] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [savedArticles, setSavedArticles] = useState([])
  const [authError, setAuthError] = useState('')

  const openLoginModal = () => {
    setAuthError('')
    setActiveModal('login')
  }
  const openRegisterModal = () => {
    setAuthError('')
    setActiveModal('register')
  }
  const closeModal = () => {
    setActiveModal('')
    setAuthError('')
  }

  useEffect(() => {
    const token = getToken()
    if (!token) {
      return
    }

    getUserByToken(token)
      .then((user) => {
        setCurrentUser(user)
      })
      .catch(() => {
        logout()
      })
  }, [])

  useEffect(() => {
    if (!currentUser) {
      return
    }

    getSavedArticles(currentUser.id)
      .then((items) => setSavedArticles(items))
      .catch(() => setSavedArticles([]))
  }, [currentUser])

  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials)
      setCurrentUser(response.user)
      closeModal()
    } catch (error) {
      setAuthError(error.message)
    }
  }

  const handleRegister = async (credentials) => {
    try {
      const response = await register(credentials)
      setCurrentUser(response.user)
      closeModal()
    } catch (error) {
      setAuthError(error.message)
    }
  }

  const handleLogout = () => {
    logout()
    setCurrentUser(null)
    setSavedArticles([])
  }

  const handleToggleSave = async (article) => {
    if (!currentUser) {
      openLoginModal()
      return
    }

    try {
      const existing = savedArticles.find((item) => item.originalUrl === article.url)

      if (existing) {
        await handleDeleteSaved(existing.id)
        return
      }

      const savedItem = await saveArticle(article, currentUser.id)
      setSavedArticles((prev) => [savedItem, ...prev])
    } catch {
      // Save/delete errors are intentionally ignored in this stage scaffold.
    }
  }

  const handleDeleteSaved = async (savedArticleId) => {
    if (!currentUser) {
      return
    }

    try {
      await deleteArticle(savedArticleId, currentUser.id)
      setSavedArticles((prev) => prev.filter((item) => item.id !== savedArticleId))
    } catch {
      // Save/delete errors are intentionally ignored in this stage scaffold.
    }
  }

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onLoginClick={openLoginModal}
              onRegisterClick={openRegisterModal}
              onLogoutClick={handleLogout}
              isLoggedIn={Boolean(currentUser)}
              currentUser={currentUser}
              savedArticles={savedArticles}
              onToggleSave={handleToggleSave}
            />
          }
        />
        <Route
          path="/saved-news"
          element={
            <SavedNewsPage
              onLoginClick={openLoginModal}
              onRegisterClick={openRegisterModal}
              onLogoutClick={handleLogout}
              isLoggedIn={Boolean(currentUser)}
              currentUser={currentUser}
              savedArticles={savedArticles}
              onDeleteSaved={handleDeleteSaved}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <LoginModal
        isOpen={activeModal === 'login'}
        onClose={closeModal}
        onSwitchToRegister={openRegisterModal}
        onSubmit={handleLogin}
        errorMessage={authError}
      />
      <RegisterModal
        isOpen={activeModal === 'register'}
        onClose={closeModal}
        onSwitchToLogin={openLoginModal}
        onSubmit={handleRegister}
        errorMessage={authError}
      />
    </div>
  )
}

export default App