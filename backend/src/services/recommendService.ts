// backend/src/services/recommendService.ts

export const scoreCrop = (crop: any, soilData: any): number => {
    let score = 0;

    // 1. Season Alignment (Critical)
    if (crop.season === soilData.season) score += 30;

    // 2. pH Range (Critical for nutrient uptake)
    if (soilData.ph >= crop.min_ph && soilData.ph <= crop.max_ph) score += 25;

    // 3. Soil Type Compatibility
    if (crop.suitable_soil.includes(soilData.soil_type)) score += 20;

    // 4. Nutrient Minimums
    if (Number(soilData.nitrogen) >= Number(crop.min_nitrogen)) score += 10;
    if (Number(soilData.phosphorus) >= Number(crop.min_phosphorus)) score += 10;
    if (Number(soilData.potassium) >= Number(crop.min_potassium)) score += 5;

    return score;
}

export const generateRecommendations = (soilData: any, userId: number, cropsFromDb: any[]) => {
    // Create the snapshot object to be stored in JSONB
    const snapshot = {
        ph: soilData.ph,
        n: soilData.nitrogen,
        p: soilData.phosphorus,
        k: soilData.potassium,
        type: soilData.soil_type
    };

    return cropsFromDb
        .map((crop) => {
            const score = scoreCrop(crop, soilData);
            return {
                user_id: userId,
                soil_id: soilData.id,
                crop_name: crop.name,
                suitability_score: score,
                soil_snapshot: snapshot, // Storing the "frozen" data
                reason: `Scored ${score}% based on ${soilData.season} season requirements and ${soilData.soil_type} soil compatibility.`,
            };
        })
        .filter((c) => c.suitability_score >= 30) // Only suggest viable crops
        .sort((a, b) => b.suitability_score - a.suitability_score)
        .slice(0, 3);
}