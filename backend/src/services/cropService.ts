// backend/src/services/cropService.ts

// Crop data and logic
// Later can be replaced with external API

export const cropRequirements = [
    {
        name: 'Wheat',
        season: 'rabi',
        suitable_soil: ['loamy', 'clay loam'],
        min_ph: 6.0,
        max_ph: 7.5,
        min_nitrogen: 80,
        min_phosphorus: 40,
        min_potassium: 30,
    },
    {
        name: 'Rice',
        season: 'kharif',
        suitable_soil: ['clay', 'clay loam'],
        min_ph: 5.5,
        max_ph: 6.5,
        min_nitrogen: 80,
        min_phosphorus: 40,
        min_potassium: 40,
    },
    {
        name: 'Maize',
        season: 'kharif',
        suitable_soil: ['sandy loam', 'loamy'],
        min_ph: 5.8,
        max_ph: 7.0,
        min_nitrogen: 100,
        min_phosphorus: 50,
        min_potassium: 40,
    },
    {
        name: 'Soybean',
        season: 'kharif',
        suitable_soil: ['loamy', 'clay loam'],
        min_ph: 6.0,
        max_ph: 7.5,
        min_nitrogen: 20,
        min_phosphorus: 60,
        min_potassium: 40,
    },
    {
        name: 'Cotton',
        season: 'kharif',
        suitable_soil: ['black soil', 'clay'],
        min_ph: 6.0,
        max_ph: 8.0,
        min_nitrogen: 80,
        min_phosphorus: 40,
        min_potassium: 40,
    },
    {
        name: 'Sugarcane',
        season: 'zaid',
        suitable_soil: ['loamy', 'clay loam'],
        min_ph: 6.0,
        max_ph: 7.5,
        min_nitrogen: 150,
        min_phosphorus: 60,
        min_potassium: 50,
    },
]

export const getCropDetails = (name: string) => {
    return cropRequirements.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
    ) || null
}

export const getAllCrops = () => cropRequirements