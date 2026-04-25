// frontend/src/pages/PestAlerts.tsx

const alertsData = [
  {
    id: 1,
    pest: 'Fall Armyworm',
    crop: 'Maize',
    region: 'Karnataka, Andhra Pradesh',
    severity: 'High',
    description: 'Widespread infestation reported. Apply recommended pesticides immediately.',
  },
  {
    id: 2,
    pest: 'Brown Plant Hopper',
    crop: 'Rice',
    region: 'Tamil Nadu, Kerala',
    severity: 'Medium',
    description: 'Moderate spread detected. Monitor fields closely and drain excess water.',
  },
  {
    id: 3,
    pest: 'Aphids',
    crop: 'Wheat',
    region: 'Punjab, Haryana',
    severity: 'Low',
    description: 'Minor presence observed. Use neem-based sprays as a precaution.',
  },
  {
    id: 4,
    pest: 'Whitefly',
    crop: 'Cotton',
    region: 'Gujarat, Rajasthan',
    severity: 'High',
    description: 'Severe outbreak reported. Consult local agricultural officer immediately.',
  },
  {
    id: 5,
    pest: 'Stem Borer',
    crop: 'Sugarcane',
    region: 'Uttar Pradesh, Bihar',
    severity: 'Medium',
    description: 'Moderate infestation detected. Apply carbofuran granules near root zone.',
  },
];

const severityColor: Record<string, string> = {
  High: 'bg-red-100 text-red-600',
  Medium: 'bg-yellow-100 text-yellow-600',
  Low: 'bg-green-100 text-green-600',
};

function PestAlerts() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Pest Alerts</h1>
        <p className="text-gray-500 text-sm mb-8">Active pest outbreak alerts across India</p>

        <div className="space-y-4">
          {alertsData.map((alert) => (
            <div key={alert.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{alert.pest}</h2>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${severityColor[alert.severity]}`}
                >
                  {alert.severity}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">
                🌾 Affected Crop: <span className="font-medium text-gray-700">{alert.crop}</span>
              </p>
              <p className="text-sm text-gray-500 mb-3">
                📍 Region: <span className="font-medium text-gray-700">{alert.region}</span>
              </p>
              <p className="text-sm text-gray-600">{alert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PestAlerts;
