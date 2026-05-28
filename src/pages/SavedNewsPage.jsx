import Header from '../components/Header/Header.jsx'
import Main from '../components/Main/Main.jsx'
import Footer from '../components/Footer/Footer.jsx'
import { useState } from 'react'

const CARDS_PER_BATCH = 3

function SavedNewsPage({
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  isLoggedIn,
  currentUser,
  savedArticles,
  onDeleteSaved,
}) {
  const [cardsVisible, setCardsVisible] = useState(CARDS_PER_BATCH)
  const visibleArticles = savedArticles.slice(0, cardsVisible)

  return (
    <div className="page-shell">
      <Header
        title="Saved articles"
        subtitle="Articles saved by this user"
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogoutClick={onLogoutClick}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />
      <Main
        title="Saved news"
        showSection
        articles={visibleArticles}
        isLoading={false}
        isError={false}
        errorMessage=""
        emptyMessage="No saved articles yet"
        canShowMore={cardsVisible < savedArticles.length}
        onShowMore={() => setCardsVisible((prev) => prev + CARDS_PER_BATCH)}
        onCardAction={(article) => onDeleteSaved(article.id)}
        isLoggedIn={isLoggedIn}
      />
      <Footer />
    </div>
  )
}

export default SavedNewsPage
