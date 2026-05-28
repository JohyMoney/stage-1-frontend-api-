import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from '../../pages/HomePage.jsx'
import SavedNewsPage from '../../pages/SavedNewsPage.jsx'
import LoginModal from '../LoginModal/LoginModal.jsx'
import RegisterModal from '../RegisterModal/RegisterModal.jsx'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx'
import SuccessModal from '../SuccessModal/SuccessModal.jsx'
import { searchNews } from '../../utils/NewsApi.js'
import { getToken, getUserByToken, login, logout, register } from '../../utils/AuthApi.js'
import {
  deleteArticle,
  getSavedArticles,
  saveArticle,
} from '../../utils/SavedArticlesApi.js'
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'
import './App.css'

const REQUEST_ERROR_MESSAGE =
  'Sorry, something went wrong during the request. Please try again later.'

const CARDS_PER_BATCH = 3

function App() {
  const navigate = useNavigate()
  const [activeModal, setActiveModal] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [savedArticles, setSavedArticles] = useState([])
  const [authError, setAuthError] = useState('')
  const [articles, setArticles] = useState([])
  const [cardsVisible, setCardsVisible] = useState(CARDS_PER_BATCH)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchError, setSearchError] = useState('')

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
      await register(credentials)
      setActiveModal('success')
    } catch (error) {
      setAuthError(error.message)
    }
  }

  const handleRegistrationSuccessAcknowledge = () => {
    setActiveModal('login')
  }

  const handleLogout = () => {
    logout()
    setCurrentUser(null)
    setSavedArticles([])
    navigate('/')
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

  const handleSearch = async (value) => {
    const query = value.trim()
    setHasSearched(true)
    setCardsVisible(CARDS_PER_BATCH)
    setSearchError('')

    if (!query) {
      setArticles([])
      return
    }

    setIsLoading(true)

    try {
      const results = await searchNews(query)
      setArticles(results)
    } catch {
      setSearchError(REQUEST_ERROR_MESSAGE)
      setArticles([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleShowMore = () => {
    setCardsVisible((prev) => prev + CARDS_PER_BATCH)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                savedArticles={savedArticles}
                onToggleSave={handleToggleSave}
                articles={articles}
                cardsVisible={cardsVisible}
                isLoading={isLoading}
                hasSearched={hasSearched}
                searchError={searchError}
                onSearch={handleSearch}
                onShowMore={handleShowMore}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute
                isLoggedIn={Boolean(currentUser)}
                onUnauthorized={() => {
                  openLoginModal()
                }}
              >
                <SavedNewsPage
                  onLoginClick={openLoginModal}
                  onRegisterClick={openRegisterModal}
                  onLogoutClick={handleLogout}
                  isLoggedIn={Boolean(currentUser)}
                  savedArticles={savedArticles}
                  onDeleteSaved={handleDeleteSaved}
                />
              </ProtectedRoute>
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
        <SuccessModal
          isOpen={activeModal === 'success'}
          onClose={closeModal}
          onConfirm={handleRegistrationSuccessAcknowledge}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App