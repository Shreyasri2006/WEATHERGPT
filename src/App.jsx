import { useEffect, useState } from 'react'
import {
  Bot,
  CloudSun,
  Database,
  Gauge,
  Github,
  History,
  Map,
  Navigation,
  RefreshCw,
  ShieldAlert,
} from 'lucide-react'
import AlertBanner from './components/AlertBanner'
import AgreementCard from './components/AgreementCard'
import ChatPanel from './components/ChatPanel'
import ClimateCard from './components/ClimateCard'
import ForecastStrip from './components/ForecastStrip'
import LocationSearch from './components/LocationSearch'
import ReplayPanel from './components/ReplayPanel'
import RiskCard from './components/RiskCard'
import SourcePanel from './components/SourcePanel'
import RoutePanel from './components/RoutePanel'
import WeatherMap from './components/WeatherMap'
import { api } from './lib/api'
import { weatherDescription, weatherEmoji } from './lib/weather'

const DEFAULT_LOCATION = {
  name: 'Mysuru',
  latitude: 12.2958,
  longitude: 76.6394,
  country: 'India',
  admin1: 'Karnataka',
}

const NAV_ITEMS = [
  ['dashboard', CloudSun, 'Overview'],
  ['copilot', Bot, 'Copilot'],
  ['map', Map, 'Risk Map'],
  ['climate', Database, 'Climate'],
  ['replay', History, 'Replay'],
  ['route', Navigation, 'Route'],
]

const PERSONAS = [
  ['citizen', 'Citizen'], ['farmer', 'Farmer'], ['fisherman', 'Fisherman'], ['traveller', 'Traveller'],
  ['disaster_officer', 'Disaster Officer'], ['researcher', 'Researcher'], ['aviation', 'Aviation'],
]

export default function App() {
  const [active, setActive] = useState('dashboard')
  const [location, setLocation] = useState(DEFAULT_LOCATION)
  const [bundle, setBundle] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [persona, setPersona] = useState('citizen')
  const [language, setLanguage] = useState('en')

  async function refresh(target = location) {
    setLoading(true)
    setError('')
    try {
      const data = await api.weatherBundle(target)
      setBundle(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh(location)
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {})
    }
  }, [])

  const currentDescription = weatherDescription(bundle?.current?.weather_code)

  function selectLocation(next) {
    setLocation(next)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">W</div>
          <div><strong>WeatherGPT</strong><span>SIH 26068</span></div>
        </div>
        <nav>
          {NAV_ITEMS.map(([id, Icon, label]) => (
            <button key={id} className={active === id ? 'active' : ''} onClick={() => setActive(id)}>
              <Icon size={18} /><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="safety-card">
            <ShieldAlert size={18} />
            <div><strong>Safety-first</strong><span>Official severe warnings override routine advice.</span></div>
          </div>
          <a className="repo-hint" href="https://github.com/Shreyasri2006/WEATHERGPT--as-a-Safety-First-Weather-Decision-Copilot" target="_blank" rel="noreferrer"><Github size={16} /> GitHub-ready build</a>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <LocationSearch location={location} onSelect={selectLocation} />
          <div className="topbar-controls">
            <select value={persona} onChange={(e) => setPersona(e.target.value)} aria-label="Persona">
              {PERSONAS.map(([id, label]) => <option value={id} key={id}>{label}</option>)}
            </select>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Language">
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>
            <button className="icon-btn" onClick={() => refresh()} title="Refresh weather"><RefreshCw size={17} className={loading ? 'spin' : ''} /></button>
          </div>
        </header>

        {error && <div className="error-banner"><strong>Backend connection problem:</strong> {error}<span>API: {api.base}</span></div>}

        {active === 'dashboard' && (
          <div className="page dashboard-page">
            <section className="hero-card">
              <div>
                <span className="eyebrow">Safety-First Weather Decision Copilot</span>
                <h1>{location.name}</h1>
                <p>{currentDescription}</p>
                <div className="hero-temp-row">
                  <strong>{bundle?.current?.temperature_c ?? '—'}°</strong>
                  <div><span>Feels {bundle?.current?.apparent_temperature_c ?? '—'}°C</span><span>Humidity {bundle?.current?.humidity_pct ?? '—'}%</span></div>
                </div>
              </div>
              <div className="hero-weather-icon">{weatherEmoji(bundle?.current?.weather_code)}</div>
              <div className="hero-stats">
                <div><span>Wind</span><strong>{bundle?.current?.wind_speed_kmh ?? '—'} km/h</strong></div>
                <div><span>Rain now</span><strong>{bundle?.current?.rain_mm ?? '—'} mm</strong></div>
                <div><span>Risk</span><strong>{bundle?.risk?.score ?? '—'}/100</strong></div>
                <div><span>Agreement</span><strong>{bundle?.agreement?.score ?? '—'}%</strong></div>
              </div>
            </section>

            <AlertBanner alerts={bundle?.alerts || []} />
            <ForecastStrip forecast={bundle?.forecast || []} />
            <div className="dashboard-grid">
              <AgreementCard agreement={bundle?.agreement} />
              <RiskCard risk={bundle?.risk} />
            </div>
            <SourcePanel sources={bundle?.sources || []} />
            <div className="source-footer">
              <Gauge size={16} />
              <span>Prototype live source: {bundle?.sources?.[0]?.name || 'waiting for backend'}.</span>
              <span>Derived alerts are visibly separated from official warnings.</span>
            </div>
          </div>
        )}

        {active === 'copilot' && (
          <div className="page single-page"><ChatPanel location={location} persona={persona} language={language} onBundle={setBundle} /></div>
        )}
        {active === 'map' && (
          <div className="page map-page"><WeatherMap location={location} bundle={bundle} /><RiskCard risk={bundle?.risk} /></div>
        )}
        {active === 'climate' && (
          <div className="page climate-page"><ClimateCard climate={bundle?.climate} /><AgreementCard agreement={bundle?.agreement} /></div>
        )}
        {active === 'replay' && <div className="page single-page"><ReplayPanel /></div>}
        {active === 'route' && <div className="page single-page"><RoutePanel currentLocation={location} /></div>}
      </main>
    </div>
  )
}
