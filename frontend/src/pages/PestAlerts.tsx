// frontend/src/pages/PestAlerts.tsx

import { useState } from 'react';
import AlertBanner from '../components/AlertBanner';

const alertsData = [
  {
    id: 1,
    pest_name: 'Fall Armyworm',
    affected_crop: 'Maize',
    region: 'Karnataka, Andhra Pradesh',
    severity: 'High' as const,
    description: 'Widespread infestation reported. Apply recommended pesticides immediately.',
  },
  {
    id: 2,
    pest_name: 'Brown Plant Hopper',
    affected_crop: 'Rice',
    region: 'Tamil Nadu, Kerala',
    severity: 'Medium' as const,
    description: 'Moderate spread detected. Monitor fields closely and drain excess water.',
  },
  {
    id: 3,
    pest_name: 'Aphids',
    affected_crop: 'Wheat',
    region: 'Punjab, Haryana',
    severity: 'Low' as const,
    description: 'Minor presence observed. Use neem-based sprays as a precaution.',
  },
  {
    id: 4,
    pest_name: 'Whitefly',
    affected_crop: 'Cotton',
    region: 'Gujarat, Rajasthan',
    severity: 'High' as const,
    description: 'Severe outbreak reported. Consult local agricultural officer immediately.',
  },
  {
    id: 5,
    pest_name: 'Stem Borer',
    affected_crop: 'Sugarcane',
    region: 'Uttar Pradesh, Bihar',
    severity: 'Medium' as const,
    description: 'Moderate infestation detected. Apply carbofuran granules near root zone.',
  },
];

const SEVERITY_OPTIONS = ['All', 'High', 'Medium', 'Low'];
const CROP_OPTIONS = ['All', ...new Set(alertsData.map((a) => a.affected_crop))];

function PestAlerts() {
  const [severityFilter, setSeverityFilter] = useState('All');
  const [cropFilter, setCropFilter] = useState('All');

  const filtered = alertsData.filter((alert) => {
    const matchSeverity = severityFilter === 'All' || alert.severity === severityFilter;
    const matchCrop = cropFilter === 'All' || alert.affected_crop === cropFilter;
    return matchSeverity && matchCrop;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Pest Alerts</h1>
        <p className="text-gray-500 text-sm mb-6">Active pest outbreak alerts across India</p>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Severity</label>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {SEVERITY_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Crop</label>
            <select
              value={cropFilter}
              onChange={(e) => setCropFilter(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {CROP_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {(severityFilter !== 'All' || cropFilter !== 'All') && (
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSeverityFilter('All');
                  setCropFilter('All');
                }}
                className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Alerts */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 text-sm mt-12">
            No alerts found for the selected filters.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((alert) => (
              <AlertBanner
                key={alert.id}
                pest_name={alert.pest_name}
                affected_crop={alert.affected_crop}
                region={alert.region}
                severity={alert.severity}
                description={alert.description}
              />
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-8 text-center">
          Showing {filtered.length} of {alertsData.length} alerts
        </p>
      </div>
    </div>
  );
}

export default PestAlerts;
