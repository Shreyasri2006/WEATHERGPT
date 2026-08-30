import { ShieldAlert, ShieldCheck } from 'lucide-react'

export default function AlertBanner({ alerts = [] }) {
  const official = alerts.filter((item) => item.official)
  const top = official[0] || alerts[0]
  if (!top) {
    return <div className="alert-banner safe-banner"><ShieldCheck size={20} /><div><strong>No active hazard signal</strong><span>Continue monitoring official local updates.</span></div></div>
  }
  return (
    <div className={`alert-banner ${top.official ? 'official-banner' : 'derived-banner'}`}>
      <ShieldAlert size={22} />
      <div>
        <div className="alert-title-row"><strong>{top.title}</strong><span className="source-pill">{top.official ? 'OFFICIAL' : 'DERIVED'}</span></div>
        <span>{top.message}</span>
        <small>{top.source}</small>
      </div>
    </div>
  )
}
