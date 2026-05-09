'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// PLACEHOLDER LOCATIONS — replace with real operational bases when known.
// Coordinates are approximate; only the head office is real (Richmond, North Yorkshire).
const locations: Array<{
  name: string;
  address: string;
  coords: [number, number];
  isHeadOffice?: boolean;
}> = [
  {
    name: 'Head Office',
    address: 'Richmond, North Yorkshire',
    coords: [54.404, -1.737],
    isHeadOffice: true,
  },
  {
    name: 'Midlands Operational Base',
    address: 'Birmingham (placeholder)',
    coords: [52.486, -1.89],
  },
  {
    name: 'Southern Operational Base',
    address: 'Greater London (placeholder)',
    coords: [51.505, -0.09],
  },
];

const orangePinIcon = L.divIcon({
  className: 'gnat-map-pin',
  html: `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.27 0 0 6.27 0 14c0 9.5 14 22 14 22s14-12.5 14-22C28 6.27 21.73 0 14 0z" fill="#ff6b35" stroke="#1a2332" stroke-width="1.5"/>
    <circle cx="14" cy="14" r="4.5" fill="#fff"/>
  </svg>`,
  iconSize: [28, 36],
  iconAnchor: [14, 36],
  popupAnchor: [0, -32],
});

const ukCenter: [number, number] = [53.4, -1.5];

export default function CoverageMap() {
  return (
    <MapContainer
      center={ukCenter}
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
      aria-label="Map of GNAT UK operational coverage across the United Kingdom"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc) => (
        <Marker key={loc.name} position={loc.coords} icon={orangePinIcon}>
          <Popup>
            <strong>{loc.name}</strong>
            <br />
            {loc.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
