import { GitCompareArrows } from 'lucide-react'

export default function AgreementCard({ agreement }) {
  if (!agreement) return null
  return (
    <section className="panel agreement-card">
      <div className="panel-title"><GitCompareArrows size={19} /><div><span>Forecast agreement</span><small>Cross-model similarity, not AI confidence</small></div></div>
      <div className="agreement-score"><strong>{agreement.score}%</strong><span className={`badge ${agreement.label}`}>{agreement.label}</span></div>
      <div className="meter"><span style={{ width: `${agreement.score}%` }} /></div>
      <p>{agreement.summary}</p>
      <div className="model-grid">
        {agreement.models.map((model) => (
          <div key={model.model}>
            <strong>{model.model}</strong>
            <span>{model.precipitation_24h_mm ?? '—'} mm rain</span>
            <span>{model.max_temperature_24h_c ?? '—'}°C max</span>
            <span>{model.max_wind_24h_kmh ?? '—'} km/h wind</span>
          </div>
        ))}
      </div>
    </section>
  )
}
