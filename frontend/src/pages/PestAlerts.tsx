// frontend/src/pages/PestAlerts.tsx

import AlertBanner from '../components/AlertBanner';

const alertsData = [
  {
    id: 1,
    pest_name: 'Fall Armyworm',
    affected_crop: 'Maize',
    region: 'Karnataka, Andhra Pradesh',
    severity: 'High',
    description: 'Widespread infestation reported. Apply recommended pesticides immediately.',
  },
  {
    id: 2,
    pest_name: 'Brown Plant Hopper',
    affected_crop: 'Rice',
    region: 'Tamil Nadu, Kerala',
    severity: 'Medium',
    description: 'Moderate spread detected. Monitor fields closely and drain excess water.',
  },
  {
    id: 3,
    pest_name: 'Aphids',
    affected_crop: 'Wheat',
    region: 'Punjab, Haryana',
    severity: 'Low',
    description: 'Minor presence observed. Use neem-based sprays as a precaution.',
  },
  {
    id: 4,
    pest_name: 'Whitefly',
    affected_crop: 'Cotton',
    region: 'Gujarat, Rajasthan',
    severity: 'High',
    description: 'Severe outbreak reported. Consult local agricultural officer immediately.',
  },
  {
    id: 5,
    pest_name: 'Stem Borer',
    affected_crop: 'Sugarcane',
    region: 'Uttar Pradesh, Bihar',
    severity: 'Medium',
    description: 'Moderate infestation detected. Apply carbofuran granules near root zone.',
  },
] as const;

function PestAlerts() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Pest Alerts</h1>
        <p className="text-gray-500 text-sm mb-8">Active pest outbreak alerts across India</p>

        <div className="space-y-4">
          {alertsData.map((alert) => (
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
      </div>
    </div>
  );
}

export default PestAlerts;
