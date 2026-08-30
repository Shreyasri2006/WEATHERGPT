import { useRef, useState } from 'react'
import { Bot, Mic, Send, Volume2 } from 'lucide-react'
import { api } from '../lib/api'

const EXAMPLES = [
  'Can I spray pesticide tomorrow morning?',
  'Is it safe to travel tomorrow?',
  'Are there any severe weather alerts?',
]

export default function ChatPanel({ location, persona, language, onBundle }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Ask me what the weather means for your activity. I will use structured forecast data and show safety signals instead of inventing weather numbers.' },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const recognitionRef = useRef(null)

  async function send(text = input) {
    const message = text.trim()
    if (!message || busy) return
    setMessages((items) => [...items, { role: 'user', text: message }])
    setInput('')
    setBusy(true)
    try {
      const result = await api.chat({
        message,
        latitude: location.latitude,
        longitude: location.longitude,
        location_name: location.name,
        persona,
        language,
      })
      setMessages((items) => [...items, { role: 'assistant', text: result.answer, action: result.action, override: result.safety_override }])
      onBundle?.(result.bundle)
    } catch (error) {
      setMessages((items) => [...items, { role: 'assistant', text: `I could not reach the weather backend: ${error.message}` }])
    } finally {
      setBusy(false)
    }
  }

  function startVoice() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Recognition) {
      alert('Speech recognition is not supported in this browser. Try Chrome/Edge or use text input.')
      return
    }
    const recognition = new Recognition()
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'kn' ? 'kn-IN' : 'en-IN'
    recognition.interimResults = false
    recognition.onresult = (event) => setInput(event.results[0][0].transcript)
    recognition.start()
    recognitionRef.current = recognition
  }

  function speak(text) {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'kn' ? 'kn-IN' : 'en-IN'
    window.speechSynthesis.speak(utterance)
  }

  return (
    <section className="panel chat-panel">
      <div className="panel-title"><Bot size={20} /><div><span>WeatherGPT Copilot</span><small>{persona.replace('_', ' ')} mode · {location.name}</small></div></div>
      <div className="example-row">
        {EXAMPLES.map((example) => <button key={example} onClick={() => send(example)}>{example}</button>)}
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
            <div>
              {message.override && <span className="override-label">SAFETY OVERRIDE</span>}
              {message.text.split('\n').map((line, lineIndex) => <p key={lineIndex}>{line}</p>)}
            </div>
            {message.role === 'assistant' && <button className="speak-btn" onClick={() => speak(message.text)} title="Read aloud"><Volume2 size={15} /></button>}
          </div>
        ))}
        {busy && <div className="message assistant"><div><p>Checking live forecast, model agreement and safety signals…</p></div></div>}
      </div>
      <div className="chat-input-row">
        <button className="icon-btn voice-btn" onClick={startVoice} title="Voice input"><Mic size={19} /></button>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }} placeholder="Ask: Should I irrigate tomorrow?" rows="2" />
        <button className="send-btn" onClick={() => send()} disabled={busy}><Send size={18} /></button>
      </div>
    </section>
  )
}
