import { DatabaseZap, ExternalLink } from 'lucide-react'

function formatFetched(value) {
  if (!value) return 'Unknown time'
  try {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value))
  } catch {
    return value
  }
}

export default function SourcePanel({ sources = [] }) {
  return (
    <section className="panel source-panel">
      <div className="panel-title">
        <DatabaseZap size={19} />
        <div><span>Data provenance</span><small>Know where each weather signal came from</small></div>
      </div>
      <div className="source-list">
        {sources.length ? sources.map((source, index) => (
          <div className="source-row" key={`${source.name}-${index}`}>
            <div>
              <strong>{source.name}</strong>
              <span>{source.type.replaceAll('_', ' ')} · fetched {formatFetched(source.fetched_at)}</span>
              {source.note && <small>{source.note}</small>}
            </div>
            <div className="source-actions">
              <span className={`source-status ${source.official ? 'official' : 'prototype'}`}>{source.official ? 'Official' : 'Prototype'}</span>
              {source.url && <a href={source.url} target="_blank" rel="noreferrer" title="Open source"><ExternalLink size={15} /></a>}
            </div>
          </div>
        )) : <p className="muted">Source information will appear after weather data loads.</p>}
      </div>
    </section>
  )
}
