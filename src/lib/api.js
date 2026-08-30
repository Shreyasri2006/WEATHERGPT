const configuredBase = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/$/, '')
const isLocalBrowser = ['localhost', '127.0.0.1'].includes(window.location.hostname)
const API_BASE = configuredBase || (isLocalBrowser ? 'http://127.0.0.1:8000' : '')

async function request(path, options = {}) {
  if (!API_BASE) {
    throw new Error('Public backend URL is not configured. Set VITE_API_BASE_URL in GitHub Actions after deploying the FastAPI backend.')
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  })
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.detail || `Request failed (${response.status})`)
  }
  return response.json()
}

export const api = {
  base: API_BASE || 'Not configured',
  searchLocations: (query) => request(`/api/v1/locations/search?q=${encodeURIComponent(query)}`),
  weatherBundle: (location) => request(
    `/api/v1/weather/bundle?latitude=${location.latitude}&longitude=${location.longitude}&location_name=${encodeURIComponent(location.name)}&days=7`,
  ),
  chat: (payload) => request('/api/v1/chat', { method: 'POST', body: JSON.stringify(payload) }),
  replayScenarios: () => request('/api/v1/replay/scenarios'),
  routeRisk: (payload) => request('/api/v1/route-risk', { method: 'POST', body: JSON.stringify(payload) }),
}
