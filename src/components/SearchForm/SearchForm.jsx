import { useState } from 'react'
import './SearchForm.css'

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('')
  const [errorText, setErrorText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!query.trim()) {
      setErrorText('Please enter a keyword')
      return
    }

    setErrorText('')
    onSearch(query)
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
    if (errorText) {
      setErrorText('')
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="search-form__label" htmlFor="news-search">
        Search for a topic
      </label>
      <div className="search-form__row">
        <input
          id="news-search"
          className={`search-form__input ${errorText ? 'search-form__input_error' : ''}`}
          type="text"
          placeholder="Enter keyword"
          value={query}
          onChange={handleChange}
        />
        <button className="search-form__button" type="submit">
          Search
        </button>
      </div>
      {errorText && <p className="search-form__error">{errorText}</p>}
    </form>
  )
}

export default SearchForm
