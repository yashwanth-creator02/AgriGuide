// backend/src/services/recommendService.ts

import { cropRequirements } from './cropService'

export const scoreCrop = (crop: any, soilData: any): number => {
    let score = 0

    if (crop.season === soilData.season) score += 30
    if (soilData.ph >= crop.min_ph && soilData.ph <= crop.max_ph) score += 25
    if (crop.suitable_soil.includes(soilData.soil_type)) score += 20
    if (soilData.nitrogen >= crop.min_nitrogen) score += 10
    if (soilData.phosphorus >= crop.min_phosphorus) score += 10
    if (soilData.potassium >= crop.min_potassium) score += 5

    return score
}

export const generateRecommendations = (soilData: any) => {
    return cropRequirements
        .map((crop) => ({
            crop_name: crop.name,
            suitability_score: scoreCrop(crop, soilData),
            reason: `Best suited for ${crop.season} season with ${crop.suitable_soil.join(' or ')} soil.`,
        }))
        .filter((c) => c.suitability_score > 0)
        .sort((a, b) => b.suitability_score - a.suitability_score)
        .slice(0, 3)
}