import { useMemo } from 'react'
import Header from '../components/Header/Header.jsx'
import SearchForm from '../components/SearchForm/SearchForm.jsx'
import Main from '../components/Main/Main.jsx'
import About from '../components/About/About.jsx'
import Footer from '../components/Footer/Footer.jsx'

function HomePage({
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  isLoggedIn,
  currentUser,
  savedArticles,
  onToggleSave,
  articles,
  cardsVisible,
  isLoading,
  hasSearched,
  searchError,
  onSearch,
  onShowMore,
}) {
  const savedByUrl = useMemo(() => {
    return new Map(savedArticles.map((item) => [item.originalUrl, item]))
  }, [savedArticles])

  const visibleArticles = articles.slice(0, cardsVisible)
  const canShowMore = cardsVisible < articles.length

  const enrichedVisibleArticles = visibleArticles.map((article) => {
    const saved = savedByUrl.get(article.url)
    return {
      ...article,
      isSaved: Boolean(saved),
      savedId: saved?.id,
    }
  })

  return (
    <div className="page-shell">
      <Header
        title="NewsExplorer"
        subtitle="What is going on in the world?"
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogoutClick={onLogoutClick}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      >
        <SearchForm onSearch={onSearch} />
      </Header>
      <Main
        title="Search results"
        showSection={hasSearched || isLoading || Boolean(searchError)}
        articles={enrichedVisibleArticles}
        isLoading={isLoading}
        isError={Boolean(searchError)}
        errorMessage={searchError}
        emptyMessage="Nothing Found"
        canShowMore={canShowMore}
        onShowMore={onShowMore}
        onCardAction={onToggleSave}
        isLoggedIn={isLoggedIn}
      />
      <About />
      <Footer />
    </div>
  )
}

export default HomePage
