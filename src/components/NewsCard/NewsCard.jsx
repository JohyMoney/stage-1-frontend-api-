import './NewsCard.css'

function NewsCard({ article, onAction, isLoggedIn }) {
  const canSave = isLoggedIn

  return (
    <article className="news-card">
      <img className="news-card__image" src={article.image} alt={article.title} />
      <div className="news-card__action-wrap">
        {!canSave && (
          <span className="news-card__hint">Sign in to save articles.</span>
        )}
        <button
          className={`news-card__action ${article.isSaved ? 'news-card__action_saved' : ''}`}
          type="button"
          aria-label={article.isSaved ? 'Unsave article' : 'Save article'}
          onClick={() => onAction(article)}
        >
          <span className="news-card__icon" aria-hidden="true"></span>
        </button>
      </div>
      <div className="news-card__content">
        <p className="news-card__date">{article.date}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">{article.description}</p>
        <p className="news-card__source">{article.source}</p>
        <span className="news-card__keyword">{article.keyword}</span>
      </div>
    </article>
  )
}

export default NewsCard
