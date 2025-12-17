import { useAppStore } from '../../store/useAppStore';
import { Info } from 'lucide-react';

export default function Phase3_Simulation() {
  const { 
    forestPercent, setForestPercent, 
    rainfall, setRainfall,
    settlementPercent, setSettlementPercent,
    calculateRisk, setPhase
  } = useAppStore();

  const { riskLevel, message } = calculateRisk();

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="pointer-events-auto bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg max-w-md">
        <h2 className="text-xl font-bold text-green-900">🎛️ Control Room</h2>
        <p className="text-sm text-gray-600">Atur parameter untuk melihat dampak langsung.</p>
      </div>

      {/* Control Panel (Kiri Bawah) */}
      <div className="pointer-events-auto bg-white/90 backdrop-blur p-6 rounded-xl shadow-lg max-w-md space-y-6">
        {/* Slider Hutan */}
        <div>
          <label className="flex justify-between text-sm font-bold text-green-800 mb-1">
            <span>Luas Hutan (Spons)</span>
            <span>{forestPercent}%</span>
          </label>
          <input 
            type="range" min="0" max="100" value={forestPercent} 
            onChange={(e) => setForestPercent(Number(e.target.value))}
            className="w-full accent-green-600"
          />
          <p className="text-xs text-gray-500 mt-1">
            <Info className="inline w-3 h-3 mr-1"/>
            Semakin luas hutan, semakin banyak air terserap.
          </p>
        </div>

        {/* Slider Pemukiman */}
        <div>
          <label className="flex justify-between text-sm font-bold text-red-800 mb-1">
            <span>Pemukiman (Beton)</span>
            <span>{settlementPercent}%</span>
          </label>
          <input 
            type="range" min="0" max={100 - forestPercent} value={settlementPercent} 
            onChange={(e) => setSettlementPercent(Number(e.target.value))}
            className="w-full accent-red-600"
          />
        </div>

        {/* Status Box */}
        <div className={`p-4 rounded-lg border-l-4 ${
          riskLevel === 'BAHAYA' ? 'bg-red-100 border-red-500 text-red-800' :
          riskLevel === 'WASPADA' ? 'bg-yellow-100 border-yellow-500 text-yellow-800' :
          'bg-green-100 border-green-500 text-green-800'
        }`}>
          <div className="font-bold text-lg">STATUS: {riskLevel}</div>
          <div className="text-sm">{message}</div>
        </div>

        <button 
          onClick={() => setPhase('report')}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Lihat Laporan Lengkap →
        </button>
      </div>
    </div>
  );
}