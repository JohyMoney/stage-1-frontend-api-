const IMAGE_BASE = `${import.meta.env.BASE_URL}images`

export const mockArticles = [
  {
    id: '1',
    keyword: 'Climate',
    title: 'Coastal cities launch shared climate adaptation plan',
    description:
      'Urban research labs presented a joint roadmap to reduce flooding and heat risk in the next 10 years.',
    date: 'May 25, 2026',
    source: 'Global Brief',
    image: `${IMAGE_BASE}/news-1.png`,
  },
  {
    id: '2',
    keyword: 'Technology',
    title: 'Open transit data powers smarter city routing apps',
    description:
      'Municipal APIs are helping independent developers build traffic tools with lower commute times.',
    date: 'May 26, 2026',
    source: 'Metro Tech',
    image: `${IMAGE_BASE}/news-2.png`,
  },
  {
    id: '3',
    keyword: 'Health',
    title: 'Community clinics expand preventive care programs',
    description:
      'A regional pilot improved early screenings and reduced emergency visits across five neighborhoods.',
    date: 'May 27, 2026',
    source: 'Public Health Wire',
    image: `${IMAGE_BASE}/news-3.png`,
  },
]

export const savedArticles = [
  {
    id: '4',
    keyword: 'Science',
    title: 'Researchers map coral reef recovery after restoration',
    description:
      'A new monitoring program reported encouraging biodiversity growth in restored reef zones.',
    date: 'May 23, 2026',
    source: 'Ocean Today',
    image: `${IMAGE_BASE}/saved-1.png`,
  },
  {
    id: '5',
    keyword: 'Culture',
    title: 'Independent bookstores see renewed local demand',
    description:
      'Neighborhood reading clubs and hybrid events are driving year-over-year sales improvements.',
    date: 'May 22, 2026',
    source: 'City Journal',
    image: `${IMAGE_BASE}/saved-2.png`,
  },
]
