const BASE_URL = 'https://content.guardianapis.com/search'
const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY || 'test'

function toArticle(item, fallbackKeyword) {
  const fields = item.fields || {}

  return {
    id: item.id,
    keyword: fallbackKeyword,
    title: fields.headline || item.webTitle || 'Untitled article',
    description: fields.trailText || 'No description provided.',
    date: new Date(item.webPublicationDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    source: 'The Guardian',
    image:
      fields.thumbnail ||
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80',
    url: item.webUrl,
  }
}

export async function searchNews(query) {
  const keyword = query.trim()

  if (!keyword) {
    return []
  }

  const params = new URLSearchParams({
    q: keyword,
    'api-key': API_KEY,
    'page-size': '30',
    'show-fields': 'headline,trailText,thumbnail',
  })

  const response = await fetch(`${BASE_URL}?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  const results = payload?.response?.results || []

  return results.map((item) => toArticle(item, keyword))
}
