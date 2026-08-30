import { Droplets, Wind } from 'lucide-react'
import { formatDate, weatherDescription, weatherEmoji } from '../lib/weather'

export default function ForecastStrip({ forecast = [] }) {
  return (
    <div className="forecast-strip">
      {forecast.slice(0, 7).map((day) => (
        <article className="forecast-day" key={day.date}>
          <span className="forecast-date">{formatDate(day.date)}</span>
          <span className="weather-emoji">{weatherEmoji(day.weather_code)}</span>
          <strong>{Math.round(day.temperature_max_c ?? 0)}°</strong>
          <small>{weatherDescription(day.weather_code)}</small>
          <div className="forecast-meta"><Droplets size={13} /> {day.precipitation_probability_max_pct ?? '—'}%</div>
          <div className="forecast-meta"><Wind size={13} /> {Math.round(day.wind_speed_max_kmh ?? 0)} km/h</div>
        </article>
      ))}
    </div>
  )
}
