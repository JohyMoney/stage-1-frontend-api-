import { useMemo } from 'react'
import Header from '../components/Header/Header.jsx'
import SearchForm from '../components/SearchForm/SearchForm.jsx'
import Main from '../components/Main/Main.jsx'
import About from '../components/About/About.jsx'
import Footer from '../components/Footer/Footer.jsx'
import './HomePage.css'

function HomePage({
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  isLoggedIn,
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

  const imageBase = `${import.meta.env.BASE_URL}images`
  const featuredImages = [
    `${imageBase}/news-1.png`,
    `${imageBase}/news-2.png`,
    `${imageBase}/news-3.png`,
  ]

  return (
    <div className="page-shell">
      <Header
        title="NewsExplorer"
        subtitle="What is going on in the world?"
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        onLogoutClick={onLogoutClick}
        isLoggedIn={isLoggedIn}
      >
        <SearchForm onSearch={onSearch} />
      </Header>
      <section className="home-images content-section" aria-label="Featured news images">
        <h2 className="home-images__title">Featured Images</h2>
        <p className="home-images__subtitle">Latest visual highlights from the news feed</p>
        {featuredImages.map((imagePath, index) => (
          <img
            key={imagePath}
            className={`home-images__item ${index === 0 ? 'home-images__item_primary' : ''}`}
            src={imagePath}
            alt={`Featured news image ${index + 1}`}
          />
        ))}
      </section>
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
