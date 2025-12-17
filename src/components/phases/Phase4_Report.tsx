import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { AlertTriangle, CheckCircle, RefreshCw, Share2, TrendingDown, TrendingUp } from 'lucide-react';

export default function Phase4_Report() {
  const { calculateRisk, setPhase, forestPercent } = useAppStore();
  
  // Ambil hasil perhitungan final
  const { riskLevel, runoff, infiltration } = calculateRisk();

  // Logika Konten Dinamis (Narrative Generation)
  const getReportContent = () => {
    if (riskLevel === 'BAHAYA') {
      return {
        headline: "DARURAT EKOLOGIS!",
        subhead: "Banjir Bandang Melumpuhkan Sebagian Besar Wilayah",
        color: "text-red-600",
        bg: "bg-red-50 border-red-200",
        desc: "Keputusan tata ruang Anda telah menghilangkan daya serap tanah secara drastis. Volume air limpasan melebihi kapasitas sungai, menyebabkan kerugian ekonomi dan korban jiwa.",
        recommendation: "Segera lakukan reboisasi minimal 30% area dan kurangi area beton."
      };
    } else if (riskLevel === 'WASPADA') {
      return {
        headline: "PERINGATAN DINI",
        subhead: "Genangan Air Mulai Mengganggu Aktivitas Warga",
        color: "text-yellow-600",
        bg: "bg-yellow-50 border-yellow-200",
        desc: "Kondisi lingkungan berada di ambang batas. Saat hujan deras, saluran air tidak akan mampu menampung debit air. Ekonomi masih berjalan, namun biaya penanggulangan bencana mulai membebani.",
        recommendation: "Perluas Ruang Terbuka Hijau (RTH) dan buat sumur resapan."
      };
    } else {
      return {
        headline: "MASA DEPAN CERAH",
        subhead: "Sumatra Menjadi Contoh Pembangunan Berkelanjutan",
        color: "text-green-600",
        bg: "bg-green-50 border-green-200",
        desc: "Luar biasa! Anda berhasil menyeimbangkan kebutuhan lahan dan kelestarian alam. Cadangan air tanah terjaga, dan risiko banjir sangat minim.",
        recommendation: "Pertahankan kebijakan ini dan kembangkan ekowisata."
      };
    }
  };

  const content = getReportContent();

  return (
    <div className="flex items-center justify-center h-full w-full bg-black/50 backdrop-blur-sm p-4 z-50 overflow-y-auto">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white text-gray-900 rounded-3xl shadow-2xl max-w-3xl w-full p-8 relative"
      >
        {/* Badge Status (Stempel) */}
        <div className={`absolute top-8 right-8 border-4 ${riskLevel === 'BAHAYA' ? 'border-red-500 text-red-500' : riskLevel === 'WASPADA' ? 'border-yellow-500 text-yellow-500' : 'border-green-500 text-green-500'} font-black text-xl px-4 py-2 rounded uppercase -rotate-12 opacity-80`}>
          {riskLevel}
        </div>

        {/* Header Laporan */}
        <div className="border-b-2 border-gray-100 pb-6 mb-6">
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">Laporan Simulasi 2045</p>
          <h1 className={`text-4xl md:text-5xl font-black ${content.color} mb-2`}>{content.headline}</h1>
          <p className="text-xl font-medium text-gray-700">{content.subhead}</p>
        </div>

        {/* Grid Statistik */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Kolom Narasi */}
          <div className={`${content.bg} p-6 rounded-2xl border`}>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <AlertTriangle size={18} /> Analisis Dampak
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {content.desc}
            </p>
            <div className="bg-white/50 p-3 rounded-lg text-sm font-semibold">
              💡 Rekomendasi: {content.recommendation}
            </div>
          </div>

          {/* Kolom Angka */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Air Terserap</p>
                <p className="text-2xl font-bold text-green-600">{infiltration.toLocaleString()} m³</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full text-green-600"><CheckCircle /></div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Air Limpasan (Banjir)</p>
                <p className={`text-2xl font-bold ${riskLevel === 'AMAN' ? 'text-gray-600' : 'text-red-600'}`}>{runoff.toLocaleString()} m³</p>
              </div>
              <div className="bg-red-100 p-2 rounded-full text-red-600"><TrendingDown /></div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl">
               <div className="flex justify-between text-sm mb-1">
                 <span>Sisa Hutan</span>
                 <span className="font-bold">{forestPercent}%</span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${forestPercent}%` }}></div>
               </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => setPhase('simulation')}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition"
          >
            <RefreshCw size={18} /> Atur Ulang Simulasi
          </button>
          <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition">
            <Share2 size={18} /> Bagikan Laporan
          </button>
        </div>

      </motion.div>
    </div>
  );
}