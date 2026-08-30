import { useEffect, useState } from 'react'
import { Play, RotateCcw, Siren } from 'lucide-react'
import { api } from '../lib/api'

export default function ReplayPanel() {
  const [scenarios, setScenarios] = useState([])
  const [selected, setSelected] = useState(null)
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    api.replayScenarios().then((items) => { setScenarios(items); setSelected(items[0] || null) }).catch(() => {})
  }, [])

  useEffect(() => {
    if (!playing || !selected) return undefined
    const timer = setInterval(() => {
      setStep((current) => {
        if (current >= selected.timeline.length - 1) {
          setPlaying(false)
          return current
        }
        return current + 1
      })
    }, 1500)
    return () => clearInterval(timer)
  }, [playing, selected])

  if (!selected) return <section className="panel"><p>Replay scenarios will appear when the backend is connected.</p></section>

  const current = selected.timeline[step]
  return (
    <section className="panel replay-panel">
      <div className="panel-title"><Siren size={20} /><div><span>Disaster Replay Mode</span><small>Demonstrate the complete warning pipeline anytime</small></div></div>
      <div className="replay-controls">
        <select value={selected.id} onChange={(e) => { setSelected(scenarios.find((item) => item.id === e.target.value)); setStep(0); setPlaying(false) }}>
          {scenarios.map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}
        </select>
        <button className="primary-btn" onClick={() => setPlaying(true)}><Play size={16} /> Play</button>
        <button className="secondary-btn" onClick={() => { setStep(0); setPlaying(false) }}><RotateCcw size={16} /> Reset</button>
      </div>
      <div className={`replay-live ${current.severity}`}>
        <span>T+{current.minute} min · {current.severity.toUpperCase()}</span>
        <h2>{current.title}</h2>
        <p>{current.detail}</p>
      </div>
      <div className="timeline">
        {selected.timeline.map((item, index) => (
          <div key={`${item.minute}-${item.title}`} className={index <= step ? 'active' : ''}>
            <span>{item.minute}</span><p><strong>{item.title}</strong>{item.detail}</p>
          </div>
        ))}
      </div>
      <p className="replay-note">{selected.note}</p>
    </section>
  )
}
