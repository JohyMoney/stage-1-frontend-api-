const NEWS_API_BASE_URL = import.meta.env.PROD
  ? 'https://nomoreparties.co/news/v2/everything'
  : 'https://newsapi.org/v2/everything'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || ''
const IMAGE_BASE = `${import.meta.env.BASE_URL}images`

function formatApiDate(date) {
  return date.toISOString().slice(0, 10)
}

function toArticle(item, fallbackKeyword) {
  return {
    id: item.url,
    keyword: fallbackKeyword,
    title: item.title || 'Untitled article',
    description: item.description || 'No description provided.',
    date: new Date(item.publishedAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    source: item.source?.name || 'Unknown source',
    image: item.urlToImage || `${IMAGE_BASE}/news-1.png`,
    url: item.url,
  }
}

export async function searchNews(query) {
  const keyword = query.trim()
  if (!keyword) {
    return []
  }

  const now = new Date()
  const sevenDaysAgo = new Date(now)
  sevenDaysAgo.setDate(now.getDate() - 7)

  const params = new URLSearchParams({
    q: keyword,
    apiKey: API_KEY,
    from: formatApiDate(sevenDaysAgo),
    to: formatApiDate(now),
    pageSize: '100',
  })

  const response = await fetch(`${NEWS_API_BASE_URL}?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  if (payload?.status !== 'ok') {
    throw new Error(payload?.message || 'News API request failed.')
  }

  const results = payload?.articles || []
  return results.map((item) => toArticle(item, keyword))
}
