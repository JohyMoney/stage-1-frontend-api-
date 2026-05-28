import { mockArticles } from './constants.js'

export function fetchMockArticles() {
  return Promise.resolve(mockArticles)
}
