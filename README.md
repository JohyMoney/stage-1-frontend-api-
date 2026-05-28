# NewsExplorer Frontend

Frontend for Stage 1 (frontend + API integration) built with React and Vite.

## Features

- Third-party API integration via fetch in [src/utils/NewsApi.js](src/utils/NewsApi.js)
- Loading, empty, error, and success response handling
- Progressive rendering with Show more (3 cards per click)
- Frontend backend stubs for:
  - register/login
  - token check
  - save/delete articles
- Routing:
  - /
  - /saved-news

## API

- Service: News API
- Utility: [src/utils/NewsApi.js](src/utils/NewsApi.js)
- Endpoint in development: https://newsapi.org/v2/everything
- Endpoint in production: https://nomoreparties.co/news/v2/everything
- Environment variables:
  - VITE_NEWS_API_KEY
  - VITE_BASE_PATH

Copy [.env.example](.env.example) to .env and set values if needed.

## Local Run

1. Install dependencies:

	npm install

2. Start development server:

	npm run dev

3. Build production bundle:

	npm run build

## Deployment (GitHub Pages)

1. Set VITE_BASE_PATH in .env for your repository name:

	VITE_BASE_PATH=/YOUR_REPO_NAME/

2. Deploy:

	npm run deploy

3. Add your deployed URL below after successful deploy:

  https://johymoney.github.io/stage-1-frontend-api-/

## Stage 1.2 Requirements Coverage

- API interactions: implemented in [src/utils/NewsApi.js](src/utils/NewsApi.js)
- Response handling: implemented in [src/pages/HomePage.jsx](src/pages/HomePage.jsx) and [src/components/Main/Main.jsx](src/components/Main/Main.jsx)
- Backend simulation: implemented in [src/utils/AuthApi.js](src/utils/AuthApi.js) and [src/utils/SavedArticlesApi.js](src/utils/SavedArticlesApi.js)
- Deployment setup: implemented in [package.json](package.json) and [vite.config.js](vite.config.js)

## links for the project
github: https://github.com/JohyMoney/stage-1-frontend-api-

frontend: 

backend: http://localhost:3000

pull request (stage-1-frontend-and-api -> main):
https://github.com/JohyMoney/stage-1-frontend-api-/compare/main...stage-1-frontend-and-api?expand=1

youtube: