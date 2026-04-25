// frontend/src/components/MapPicker.tsx

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker icon issue with Leaflet + Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface MapPickerProps {
  onLocationSelect: (location: string) => void;
  onClose: () => void;
}

// Component to handle map clicks
function LocationMarker({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

function MapPicker({ onLocationSelect, onClose }: MapPickerProps) {
  const [loading, setLoading] = useState(false);

  const handleLocationSelect = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      // Reverse geocode using Open-Meteo geocoding API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();
      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.county ||
        'Unknown';
      const state = data.address.state || '';
      const locationName = state ? `${city}, ${state}` : city;
      onLocationSelect(locationName);
      onClose();
    } catch (error) {
      console.error('Reverse geocoding error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-green-700">Select Location</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
            ✕
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-3">
            Click anywhere on the map to select your location
          </p>
          {loading && <p className="text-sm text-green-600 mb-2">Getting location name...</p>}
          <MapContainer
            center={[20.5937, 78.9629]} // Center of India
            zoom={5}
            style={{ height: '400px', width: '100%', borderRadius: '8px' }}
            maxBounds={[
              [6.5, 68.0],
              [37.5, 97.5],
            ]} // India bounds
            minZoom={4}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker onSelect={handleLocationSelect} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default MapPicker;
