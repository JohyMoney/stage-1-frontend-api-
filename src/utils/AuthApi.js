const USERS_KEY = 'newsexplorer_users'
const TOKEN_KEY = 'newsexplorer_token'
const ACTIVE_USER_KEY = 'newsexplorer_active_user'

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

function readJson(key, fallback) {
  const value = localStorage.getItem(key)

  if (!value) {
    return fallback
  }

  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function createToken() {
  return `token-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export async function register({ email, password, name }) {
  const users = readJson(USERS_KEY, [])

  const existingUser = users.find((user) => user.email === email)
  if (existingUser) {
    return withDelay(new Error('A user with this email already exists.'), true)
  }

  const newUser = {
    id: `user-${Date.now()}`,
    email,
    password,
    name,
  }

  const token = createToken()
  users.push(newUser)
  writeJson(USERS_KEY, users)
  localStorage.setItem(TOKEN_KEY, token)
  writeJson(ACTIVE_USER_KEY, { id: newUser.id, email: newUser.email, name: newUser.name })

  return withDelay({ token, user: { id: newUser.id, email, name } })
}

export async function login({ email, password }) {
  const users = readJson(USERS_KEY, [])
  const user = users.find((candidate) => candidate.email === email)

  if (!user || user.password !== password) {
    return withDelay(new Error('Incorrect email or password.'), true)
  }

  const token = createToken()
  localStorage.setItem(TOKEN_KEY, token)
  writeJson(ACTIVE_USER_KEY, { id: user.id, email: user.email, name: user.name })

  return withDelay({ token, user: { id: user.id, email: user.email, name: user.name } })
}

export async function getUserByToken(token) {
  const storedToken = localStorage.getItem(TOKEN_KEY)

  if (!token || !storedToken || token !== storedToken) {
    return withDelay(new Error('Token is invalid.'), true)
  }

  const user = readJson(ACTIVE_USER_KEY, null)
  if (!user) {
    return withDelay(new Error('Token is invalid.'), true)
  }

  return withDelay(user)
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(ACTIVE_USER_KEY)
}
