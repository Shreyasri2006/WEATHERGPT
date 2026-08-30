import { useState } from 'react'
import { Navigation } from 'lucide-react'
import { api } from '../lib/api'

export default function RoutePanel({ currentLocation }) {
  const [destinationQuery, setDestinationQuery] = useState('Mysuru')
  const [destination, setDestination] = useState(null)
  const [points, setPoints] = useState([])
  const [busy, setBusy] = useState(false)

  async function findDestination() {
    const results = await api.searchLocations(destinationQuery)
    if (results[0]) setDestination(results[0])
  }

  async function analyze() {
    if (!destination) return
    setBusy(true)
    try {
      const result = await api.routeRisk({
        origin_latitude: currentLocation.latitude,
        origin_longitude: currentLocation.longitude,
        destination_latitude: destination.latitude,
        destination_longitude: destination.longitude,
        origin_name: currentLocation.name,
        destination_name: destination.name,
        samples: 5,
      })
      setPoints(result)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="panel route-panel">
      <div className="panel-title"><Navigation size={20} /><div><span>Route Weather MVP</span><small>Weather risk sampled along the trip</small></div></div>
      <div className="route-form">
        <label>Origin<input value={currentLocation.name} readOnly /></label>
        <label>Destination<div className="inline-field"><input value={destinationQuery} onChange={(e) => setDestinationQuery(e.target.value)} /><button onClick={findDestination}>Find</button></div></label>
      </div>
      {destination && <p className="selected-destination">Selected: <strong>{destination.name}</strong> {[destination.admin1, destination.country].filter(Boolean).join(', ')}</p>}
      <button className="primary-btn" disabled={!destination || busy} onClick={analyze}>{busy ? 'Analyzing…' : 'Analyze route weather'}</button>
      {points.length > 0 && (
        <div className="route-points">
          {points.map((point, index) => (
            <div key={`${point.latitude}-${point.longitude}`}>
              <span className={`route-dot ${point.risk_level}`} />
              <div><strong>{point.name}</strong><small>{point.risk_score}/100 risk · rain {point.precipitation_probability_pct ?? '—'}% · wind {Math.round(point.wind_speed_kmh ?? 0)} km/h</small></div>
              {index < points.length - 1 && <span className="route-line" />}
            </div>
          ))}
        </div>
      )}
      <p className="map-note">This MVP interpolates straight-line sample points; integrate a road-routing provider before using it for navigation.</p>
    </section>
  )
}
