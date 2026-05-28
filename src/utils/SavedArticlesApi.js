const SAVED_KEY = 'newsexplorer_saved_articles'
const IMAGE_BASE = `${import.meta.env.BASE_URL}images`
const FALLBACK_SAVED_IMAGES = [
  `${IMAGE_BASE}/saved-1.png`,
  `${IMAGE_BASE}/saved-2.png`,
]

function normalizeSavedArticle(item, index) {
  const fallbackImage = FALLBACK_SAVED_IMAGES[index % FALLBACK_SAVED_IMAGES.length]

  return {
    ...item,
    image:
      item.image && item.image.trim()
        ? item.image.startsWith('/images/')
          ? `${IMAGE_BASE}/${item.image.split('/').pop()}`
          : item.image
        : fallbackImage,
  }
}

function withDelay(value, shouldReject = false) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (shouldReject) {
        reject(value)
        return
      }

      resolve(value)
    }, 250)
  })
}

function readSaved() {
  const raw = localStorage.getItem(SAVED_KEY)

  if (!raw) {
    return []
  }

  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function writeSaved(items) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(items))
}

export async function getSavedArticles(userId) {
  const items = readSaved()
    .filter((item) => item.ownerId === userId)
    .map((item, index) => normalizeSavedArticle(item, index))
  return withDelay(items)
}

export async function saveArticle(article, userId) {
  const allItems = readSaved()
  const existing = allItems.find(
    (item) => item.ownerId === userId && item.url === article.url,
  )

  if (existing) {
    return withDelay(existing)
  }

  const savedItem = {
    ...article,
    id: `saved-${Date.now()}`,
    ownerId: userId,
    originalUrl: article.url,
    image:
      article.image && article.image.trim()
        ? article.image
        : FALLBACK_SAVED_IMAGES[allItems.length % FALLBACK_SAVED_IMAGES.length],
  }

  allItems.push(savedItem)
  writeSaved(allItems)

  return withDelay(savedItem)
}

export async function deleteArticle(savedArticleId, userId) {
  const allItems = readSaved()
  const index = allItems.findIndex(
    (item) => item.id === savedArticleId && item.ownerId === userId,
  )

  if (index < 0) {
    return withDelay(new Error('Saved article not found.'), true)
  }

  const [deleted] = allItems.splice(index, 1)
  writeSaved(allItems)

  return withDelay(deleted)
}
