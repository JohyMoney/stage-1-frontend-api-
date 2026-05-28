import NewsCard from '../NewsCard/NewsCard.jsx'
import Preloader from '../Preloader/Preloader.jsx'
import stateIllustration from '../../images/State.svg'
import './Main.css'

function Main({
  title,
  showSection,
  articles,
  isLoading,
  isError,
  errorMessage,
  emptyMessage,
  canShowMore,
  onShowMore,
  onCardAction,
  isLoggedIn,
}) {
  if (!showSection) {
    return null
  }

  return (
    <main className="main content-section">
      <h2 className="main__title">{title}</h2>

      {isLoading ? (
        <Preloader />
      ) : isError ? (
        <p className="main__message">{errorMessage}</p>
      ) : articles.length === 0 ? (
        <div className="main__empty">
          <img
            className="main__empty-image"
            src={stateIllustration}
            alt="Nothing found illustration"
          />
          <p className="main__message">{emptyMessage}</p>
        </div>
      ) : (
        <>
          <div className="main__grid">
            {articles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onAction={onCardAction}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>
          {canShowMore && (
            <button className="main__show-more" type="button" onClick={onShowMore}>
              Show more
            </button>
          )}
        </>
      )}
    </main>
  )
}

export default Main
