import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow })

export default function WeatherMap({ location, bundle }) {
  const position = [location.latitude, location.longitude]
  return (
    <section className="panel map-panel">
      <div className="panel-heading-row">
        <div><span className="eyebrow">GIS risk map</span><h3>{location.name}</h3></div>
        <span className={`badge ${bundle?.risk?.level || 'low'}`}>{bundle?.risk?.level || 'loading'}</span>
      </div>
      <MapContainer key={`${location.latitude}-${location.longitude}`} center={position} zoom={9} scrollWheelZoom className="map-box">
        <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            <strong>{location.name}</strong><br />
            Risk: {bundle?.risk?.score ?? '—'}/100<br />
            Temperature: {bundle?.current?.temperature_c ?? '—'}°C
          </Popup>
        </Marker>
      </MapContainer>
      <p className="map-note">MVP map shows the selected location and local risk. Add district polygons / official alert geometry when IMD GIS feeds are connected.</p>
    </section>
  )
}
