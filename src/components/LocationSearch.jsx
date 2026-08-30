import { useState } from 'react'
import { LocateFixed, MapPin, Search } from 'lucide-react'
import { api } from '../lib/api'

const COMMON_LOCATION_ALIASES = {
  banglore: 'Bengaluru',
  bangalore: 'Bengaluru',
  bengalore: 'Bengaluru',
  bengaluru: 'Bengaluru',
}

function normalizeQuery(value) {
  const trimmed = value.trim()
  return COMMON_LOCATION_ALIASES[trimmed.toLowerCase()] || trimmed
}

export default function LocationSearch({ location, onSelect }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  async function submit(event) {
    event.preventDefault()
    const normalized = normalizeQuery(query)
    if (normalized.length < 2) {
      setMessage('Type at least 2 characters.')
      return
    }

    setBusy(true)
    setMessage('')
    setResults([])

    try {
      const matches = await api.searchLocations(normalized)
      if (!matches.length) {
        setMessage(`No location found for “${query.trim()}”. Try a nearby city or district.`)
        return
      }

      // One-click Find: automatically select the highest-ranked geocoding result.
      onSelect(matches[0])
      setQuery('')

      // Keep alternate matches available when the query is ambiguous.
      if (matches.length > 1) setResults(matches.slice(1))
    } catch (error) {
      setMessage(error.message || 'Location search failed. Check that the backend is running.')
    } finally {
      setBusy(false)
    }
  }

  function useMyLocation() {
    setMessage('')
    if (!navigator.geolocation) {
      setMessage('Geolocation is not supported by this browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onSelect({
          name: 'My location',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setResults([])
        setQuery('')
      },
      () => setMessage('Location permission was denied or unavailable.'),
    )
  }

  return (
    <div className="location-search">
      <div className="location-current"><MapPin size={16} /><span>{location.name}</span></div>
      <form onSubmit={submit} className="search-row">
        <Search size={16} />
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setMessage('') }}
          placeholder="Search city or district"
          aria-label="Search city or district"
        />
        <button type="submit" className="mini-btn" disabled={busy}>{busy ? '...' : 'Find'}</button>
        <button type="button" className="icon-btn" onClick={useMyLocation} title="Use my location"><LocateFixed size={17} /></button>
      </form>

      {message && <div className="search-message">{message}</div>}

      {results.length > 0 && (
        <div className="search-results">
          <div className="search-results-label">Other matches</div>
          {results.map((item) => (
            <button key={`${item.latitude}-${item.longitude}`} onClick={() => { onSelect(item); setResults([]); setQuery(''); setMessage('') }}>
              <strong>{item.name}</strong><span>{[item.admin1, item.country].filter(Boolean).join(', ')}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
