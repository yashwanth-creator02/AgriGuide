// frontend/src/components/MapPicker.tsx

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPinned, X, Loader2 } from 'lucide-react';

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
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await response.json();

      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.county ||
        'Unknown';

      const state = data.address?.state || '';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
              <MapPinned className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Select Location</h2>
              <p className="text-sm text-gray-500">
                Click anywhere on the map to choose your farm area
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close map picker"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <span>Tap on the map to place a pin and fetch the nearest location name.</span>
            {loading ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-emerald-700 shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading
              </span>
            ) : (
              <span className="rounded-full bg-white px-3 py-1 text-emerald-700 shadow-sm">
                Ready
              </span>
            )}
          </div>

          <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-sm">
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              style={{ height: '420px', width: '100%' }}
              maxBounds={[
                [6.5, 68.0],
                [37.5, 97.5],
              ]}
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
    </div>
  );
}

export default MapPicker;
