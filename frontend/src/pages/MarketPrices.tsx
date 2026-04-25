// frontend/src/pages/MarketPrices.tsx

const marketData = [
  { id: 1, crop: 'Wheat', price: 2150, market: 'Pune, Maharashtra', updated: '25 Apr 2026' },
  { id: 2, crop: 'Rice', price: 3200, market: 'Hyderabad, Telangana', updated: '25 Apr 2026' },
  { id: 3, crop: 'Maize', price: 1800, market: 'Bangalore, Karnataka', updated: '24 Apr 2026' },
  { id: 4, crop: 'Soybean', price: 4100, market: 'Indore, Madhya Pradesh', updated: '24 Apr 2026' },
  { id: 5, crop: 'Cotton', price: 6500, market: 'Ahmedabad, Gujarat', updated: '23 Apr 2026' },
  {
    id: 6,
    crop: 'Sugarcane',
    price: 350,
    market: 'Lucknow, Uttar Pradesh',
    updated: '23 Apr 2026',
  },
];

function MarketPrices() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Market Prices</h1>
        <p className="text-gray-500 text-sm mb-8">Latest crop prices from markets across India</p>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="text-left px-6 py-3">Crop</th>
                <th className="text-left px-6 py-3">Price (₹/quintal)</th>
                <th className="text-left px-6 py-3">Market</th>
                <th className="text-left px-6 py-3">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 font-medium text-gray-800">{item.crop}</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">₹{item.price}</td>
                  <td className="px-6 py-4 text-gray-600">{item.market}</td>
                  <td className="px-6 py-4 text-gray-400">{item.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MarketPrices;
