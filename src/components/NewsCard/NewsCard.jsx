import './NewsCard.css'

function NewsCard({ article, onAction, isLoggedIn }) {
  const buttonLabel = article.isSaved ? 'Remove' : 'Save'

  return (
    <article className="news-card">
      <img className="news-card__image" src={article.image} alt={article.title} />
      <button className="news-card__action" type="button" onClick={() => onAction(article)}>
        {isLoggedIn || article.isSaved ? buttonLabel : 'Sign in to save'}
      </button>
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
