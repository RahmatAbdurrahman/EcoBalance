import { create } from 'zustand';

type AppPhase = 'intro' | 'tutorial' | 'simulation' | 'report';

interface AppState {
  // --- Workflow State ---
  phase: AppPhase;
  setPhase: (phase: AppPhase) => void;

  // --- Simulation Data ---
  forestPercent: number;
  rainfall: number; // mm/hari
  settlementPercent: number;
  
  // --- Actions ---
  setForestPercent: (val: number) => void;
  setRainfall: (val: number) => void;
  setSettlementPercent: (val: number) => void;

  // --- Computed Logic (Helper) ---
  calculateRisk: () => {
    runoff: number;     // Limpasan (m3)
    infiltration: number; // Serapan (m3)
    riskLevel: 'AMAN' | 'WASPADA' | 'BAHAYA';
    message: string;
  };
}

export const useAppStore = create<AppState>((set, get) => ({
  phase: 'intro', // Default mulai dari intro
  setPhase: (phase) => set({ phase }),

  forestPercent: 50,
  rainfall: 150,
  settlementPercent: 10,

  setForestPercent: (val) => set({ forestPercent: val }),
  setRainfall: (val) => set({ rainfall: val }),
  setSettlementPercent: (val) => set({ settlementPercent: val }),

  calculateRisk: () => {
    const { forestPercent, settlementPercent, rainfall } = get();
    const totalArea = 1000; // Hektar (Konstanta)
    
    // Logika Perhitungan Sederhana
    const plantationPercent = 100 - forestPercent - settlementPercent;
    
    const runoffForest = (forestPercent/100 * totalArea) * 0.1 * rainfall;
    const runoffSettlement = (settlementPercent/100 * totalArea) * 0.9 * rainfall;
    const runoffPlantation = (plantationPercent/100 * totalArea) * 0.4 * rainfall;
    
    const totalRunoff = runoffForest + runoffSettlement + runoffPlantation;
    const totalRain = totalArea * rainfall;
    const infiltration = totalRain - totalRunoff;
    const ratio = totalRunoff / totalRain;

    let riskLevel: 'AMAN' | 'WASPADA' | 'BAHAYA' = 'AMAN';
    let message = "Ekosistem seimbang.";

    if (ratio > 0.6) {
      riskLevel = 'BAHAYA';
      message = "Tanah jenuh! Risiko banjir bandang sangat tinggi.";
    } else if (ratio > 0.3) {
      riskLevel = 'WASPADA';
      message = "Air mulai menggenang, drainase kota mungkin meluap.";
    }

    return { runoff: totalRunoff, infiltration, riskLevel, message };
  }
}));