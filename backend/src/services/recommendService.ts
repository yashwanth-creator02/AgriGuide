// backend/src/services/recommendService.ts

export const scoreCrop = (crop: any, soilData: any): number => {
    let score = 0;

    // 1. Season Alignment (Critical)
    if (crop.season && soilData.season && String(crop.season).toLowerCase() === String(soilData.season).toLowerCase()) {
        score += 30;
    }

    // 2. pH Range (Critical for nutrient uptake)
    const ph = Number(soilData.ph);
    if (!isNaN(ph) && crop.min_ph !== null && crop.max_ph !== null && ph >= Number(crop.min_ph) && ph <= Number(crop.max_ph)) {
        score += 25;
    }

    // 3. Soil Type Compatibility (safe array check and case-insensitive comparison)
    if (Array.isArray(crop.suitable_soil) && soilData.soil_type) {
        const targetSoil = String(soilData.soil_type).toLowerCase().trim();
        if (crop.suitable_soil.some((s: string) => String(s).toLowerCase().trim() === targetSoil)) {
            score += 20;
        }
    }

    // 4. Nutrient Minimums
    if (Number(soilData.nitrogen) >= Number(crop.min_nitrogen)) score += 10;
    if (Number(soilData.phosphorus) >= Number(crop.min_phosphorus)) score += 10;
    if (Number(soilData.potassium) >= Number(crop.min_potassium)) score += 5;

    return score;
}

export const generateRecommendations = (soilData: any, userId: number, cropsFromDb: any[]) => {
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
                soil_id: soilData.soil_id || soilData.id,
                crop_name: crop.name,
                suitability_score: score,
                soil_snapshot: snapshot,
                reason: `Scored ${score}% based on ${soilData.season} season requirements and ${soilData.soil_type} soil compatibility.`,
            };
        })
        .filter((c) => c.suitability_score >= 30)
        .sort((a, b) => b.suitability_score - a.suitability_score)
        .slice(0, 3);
}
