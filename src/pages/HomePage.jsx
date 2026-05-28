import { useMemo, useState } from 'react'
import Header from '../components/Header/Header.jsx'
import SearchForm from '../components/SearchForm/SearchForm.jsx'
import Main from '../components/Main/Main.jsx'
import About from '../components/About/About.jsx'
import Footer from '../components/Footer/Footer.jsx'
import { searchNews } from '../utils/NewsApi.js'

const REQUEST_ERROR_MESSAGE =
  'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.'

const CARDS_PER_BATCH = 3

function HomePage({
  onLoginClick,
  onRegisterClick,
  onLogoutClick,
  isLoggedIn,
  currentUser,
  savedArticles,
  onToggleSave,
}) {
  const [articles, setArticles] = useState([])
  const [cardsVisible, setCardsVisible] = useState(CARDS_PER_BATCH)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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

  const handleSearch = async (value) => {
    const query = value.trim()
    setHasSearched(true)
    setCardsVisible(CARDS_PER_BATCH)
    setErrorMessage('')

    if (!query) {
      setArticles([])
      return
    }

    setIsLoading(true)

    try {
      const results = await searchNews(query)
      setArticles(results)
    } catch {
      setErrorMessage(REQUEST_ERROR_MESSAGE)
      setArticles([])
    } finally {
      setIsLoading(false)
    }
  }

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
        <SearchForm onSearch={handleSearch} />
      </Header>
      <Main
        title="Search results"
        showSection={hasSearched || isLoading || Boolean(errorMessage)}
        articles={enrichedVisibleArticles}
        isLoading={isLoading}
        isError={Boolean(errorMessage)}
        errorMessage={errorMessage}
        emptyMessage="Nothing found"
        canShowMore={canShowMore}
        onShowMore={() => setCardsVisible((prev) => prev + CARDS_PER_BATCH)}
        onCardAction={onToggleSave}
        isLoggedIn={isLoggedIn}
      />
      <About />
      <Footer />
    </div>
  )
}

export default HomePage
