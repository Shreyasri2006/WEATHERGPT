import { Shield } from 'lucide-react'
import { riskTone } from '../lib/weather'

export default function RiskCard({ risk }) {
  if (!risk) return null
  return (
    <section className="panel risk-card">
      <div className="panel-title"><Shield size={19} /><div><span>Explainable weather risk</span><small>Hazard signals + official warnings</small></div></div>
      <div className={`risk-number ${riskTone(risk.level)}`}><strong>{risk.score}</strong><span>/100</span></div>
      <span className={`badge ${riskTone(risk.level)}`}>{risk.level}</span>
      <div className="factor-list">
        {risk.factors.length ? risk.factors.map((factor) => (
          <div className="factor" key={`${factor.name}-${factor.detail}`}>
            <span>{factor.name}<small>{factor.detail}</small></span><strong>+{factor.contribution}</strong>
          </div>
        )) : <p className="muted">No major risk factors crossed the prototype thresholds.</p>}
      </div>
    </section>
  )
}
