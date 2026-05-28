import { useState } from 'react'
import './SearchForm.css'

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(query)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="search-form__label" htmlFor="news-search">
        Search for a topic
      </label>
      <div className="search-form__row">
        <input
          id="news-search"
          className="search-form__input"
          type="text"
          placeholder="Enter keyword"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="search-form__button" type="submit">
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchForm
