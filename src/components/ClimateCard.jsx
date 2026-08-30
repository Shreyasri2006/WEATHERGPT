import { History } from 'lucide-react'

export default function ClimateCard({ climate }) {
  return (
    <section className="panel climate-card">
      <div className="panel-title"><History size={19} /><div><span>Climate context</span><small>Historical dataset layer</small></div></div>
      {!climate?.available ? (
        <div className="empty-state">
          <strong>Historical CSV not connected yet</strong>
          <p>{climate?.note || 'Place the Kaggle CSV in the backend data folder to unlock anomalies.'}</p>
        </div>
      ) : (
        <>
          <div className="climate-numbers">
            <div><span>Forecast max</span><strong>{climate.current_value}°C</strong></div>
            <div><span>Historical normal</span><strong>{climate.historical_normal}°C</strong></div>
            <div><span>Anomaly</span><strong>{climate.anomaly > 0 ? '+' : ''}{climate.anomaly}°C</strong></div>
          </div>
          <small>Based on {climate.sample_size} historical rows. This context is not a live forecast source.</small>
        </>
      )}
    </section>
  )
}
