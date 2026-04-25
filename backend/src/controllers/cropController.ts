// backend/src/controllers/cropController.ts

import { Request, Response } from 'express'

const crops = [
    {
        name: 'Wheat',
        season: 'rabi',
        suitable_soil: ['loamy', 'clay loam'],
        min_ph: 6.0,
        max_ph: 7.5,
        about: 'One of the most widely grown cereal crops in India.',
        climate: 'Cool and dry climate. Temperature of 10-15°C during growth.',
        diseases: 'Rust, smut, and powdery mildew.',
        watering: 'Water every 10-12 days.',
        fertilizer: 'Apply 120kg/ha Nitrogen, 60kg/ha Phosphorus.',
        harvest: 'Ready in 110-120 days when grains are golden yellow.',
    },
    {
        name: 'Rice',
        season: 'kharif',
        suitable_soil: ['clay', 'clay loam'],
        min_ph: 5.5,
        max_ph: 6.5,
        about: 'A staple food crop grown mainly in the kharif season.',
        climate: 'Hot and humid climate. Requires 20-35°C temperature.',
        diseases: 'Blast, brown spot, and bacterial blight.',
        watering: 'Maintain 2-5cm standing water during vegetative stage.',
        fertilizer: 'Apply 100kg/ha Nitrogen in split doses.',
        harvest: 'Harvest when 80-85% of grains turn golden yellow.',
    },
    {
        name: 'Maize',
        season: 'kharif',
        suitable_soil: ['sandy loam', 'loamy'],
        min_ph: 5.8,
        max_ph: 7.0,
        about: 'A versatile crop used for food, fodder, and industrial purposes.',
        climate: 'Warm climate with temperature between 18-27°C.',
        diseases: 'Downy mildew, leaf blight, and stalk rot.',
        watering: 'Water every 8-10 days.',
        fertilizer: 'Apply 150kg/ha Nitrogen, 75kg/ha Phosphorus.',
        harvest: 'Ready in 90-100 days when husks are dry.',
    },
    {
        name: 'Soybean',
        season: 'kharif',
        suitable_soil: ['loamy', 'clay loam'],
        min_ph: 6.0,
        max_ph: 7.5,
        about: 'A major oilseed crop grown across central India.',
        climate: 'Warm climate with temperature between 20-30°C.',
        diseases: 'Rust, mosaic virus, and pod borer.',
        watering: 'Water every 7-10 days.',
        fertilizer: 'Apply 20kg/ha Nitrogen, 60kg/ha Phosphorus.',
        harvest: 'Ready in 90-120 days when pods turn yellow.',
    },
    {
        name: 'Cotton',
        season: 'kharif',
        suitable_soil: ['black soil', 'clay'],
        min_ph: 6.0,
        max_ph: 8.0,
        about: 'A major cash crop grown in Gujarat, Maharashtra and Telangana.',
        climate: 'Hot and dry climate with temperature between 21-30°C.',
        diseases: 'Boll weevil, leaf curl virus, and fusarium wilt.',
        watering: 'Water every 10-15 days.',
        fertilizer: 'Apply 80kg/ha Nitrogen, 40kg/ha Phosphorus.',
        harvest: 'Ready in 150-180 days when bolls open fully.',
    },
    {
        name: 'Sugarcane',
        season: 'zaid',
        suitable_soil: ['loamy', 'clay loam'],
        min_ph: 6.0,
        max_ph: 7.5,
        about: 'A major cash crop used for sugar and ethanol production.',
        climate: 'Hot and humid climate with temperature between 20-35°C.',
        diseases: 'Red rot, smut, and ratoon stunting.',
        watering: 'Water every 7-10 days.',
        fertilizer: 'Apply 150kg/ha Nitrogen, 60kg/ha Phosphorus.',
        harvest: 'Ready in 10-12 months when canes are fully mature.',
    },
]

// Get all crops
export const getCrops = async (req: Request, res: Response) => {
    try {
        res.json(crops)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching crops' })
    }
}

// Get crop by name
export const getCropByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params
        const crop = crops.find((c) => c.name.toLowerCase() === (name as string).toLowerCase())
        if (!crop) {
            return res.status(404).json({ message: 'Crop not found' })
        }
        res.json(crop)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching crop' })
    }
}