import Header from '../components/Header/Header.jsx'
import Main from '../components/Main/Main.jsx'
import Footer from '../components/Footer/Footer.jsx'
import { useContext } from 'react'
import { useState } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import './SavedNewsPage.css'

const CARDS_PER_BATCH = 3

function SavedNewsPage({
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  isLoggedIn,
  savedArticles,
  onDeleteSaved,
}) {
  const currentUser = useContext(CurrentUserContext)
  const [cardsVisible, setCardsVisible] = useState(CARDS_PER_BATCH)
  const visibleArticles = savedArticles.slice(0, cardsVisible)

  const keywords = [...new Set(savedArticles.map((article) => article.keyword))]
  const topKeywords = keywords.slice(0, 3)
  const extraKeywordsCount = keywords.length - topKeywords.length

  const keywordsLabel =
    extraKeywordsCount > 0
      ? `${topKeywords.join(', ')}, and ${extraKeywordsCount} more`
      : topKeywords.join(', ') || 'No keywords yet'

  return (
    <div className="page-shell">
      <Header
        title="Saved articles"
        subtitle="Articles saved by this user"
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogoutClick={onLogoutClick}
        isLoggedIn={isLoggedIn}
      />
      <section className="saved-news__summary content-section">
        <p className="saved-news__lead">Saved articles</p>
        <h2 className="saved-news__title">
          {currentUser?.name || 'User'}, you have {savedArticles.length} saved article
          {savedArticles.length === 1 ? '' : 's'}
        </h2>
        <p className="saved-news__keywords">
          By keywords: <strong>{keywordsLabel}</strong>
        </p>
      </section>
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
