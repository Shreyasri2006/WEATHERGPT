export const weatherDescription = (code) => {
  const descriptions = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Rime fog', 51: 'Light drizzle', 53: 'Drizzle', 55: 'Dense drizzle',
    61: 'Light rain', 63: 'Moderate rain', 65: 'Heavy rain',
    80: 'Rain showers', 81: 'Rain showers', 82: 'Violent showers',
    95: 'Thunderstorm', 96: 'Thunderstorm + hail', 99: 'Severe thunderstorm + hail',
  }
  return descriptions[code] || 'Weather conditions'
}

export const weatherEmoji = (code) => {
  if ([95, 96, 99].includes(code)) return '⛈️'
  if ([51, 53, 55].includes(code)) return '🌦️'
  if ([61, 63, 65, 80, 81, 82].includes(code)) return '🌧️'
  if ([45, 48].includes(code)) return '🌫️'
  if ([2, 3].includes(code)) return '☁️'
  if (code === 1) return '🌤️'
  return '☀️'
}

export const riskTone = (level) => {
  if (['extreme', 'severe'].includes(level)) return 'danger'
  if (level === 'high') return 'warning'
  if (level === 'moderate') return 'caution'
  return 'safe'
}

export const formatDate = (date) => new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(`${date}T00:00:00`))
