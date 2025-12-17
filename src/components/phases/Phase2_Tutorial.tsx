import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { CloudRain, ArrowDown, ArrowRight, TreePine, Building2 } from 'lucide-react';

export default function Phase2_Tutorial() {
  const setPhase = useAppStore((state) => state.setPhase);

  // Animasi Tetesan Air
  const rainDrop = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 100, opacity: 1 },
    transition: { repeat: Infinity, duration: 1.5, ease: "linear" }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-slate-900 text-white p-4 relative z-20">
      
      {/* Header Tutorial */}
      <div className="text-center mb-8 max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-400 mb-2">Pahami Konsep Neraca Air</h2>
        <p className="text-gray-300">
          Sebelum memulai simulasi, lihat perbedaan bagaimana tanah hutan dan beton merespon hujan.
        </p>
      </div>

      {/* Visual Comparison Container */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mb-10">
        
        {/* KARTU 1: HUTAN (Infiltrasi) */}
        <div className="flex-1 bg-green-900/30 border border-green-500/50 rounded-2xl p-6 relative overflow-hidden group hover:bg-green-900/50 transition">
          <div className="flex items-center gap-2 mb-4 text-green-400 font-bold text-xl">
            <TreePine /> HUTAN (Spons)
          </div>
          
          {/* Ilustrasi Animasi */}
          <div className="h-40 bg-green-800/50 rounded-lg relative mb-4 flex justify-center overflow-hidden">
             {/* Hujan Turun */}
             <div className="absolute top-0 w-full flex justify-around">
               {[1,2,3].map(i => (
                 <motion.div key={i} variants={rainDrop} initial="initial" animate="animate" className="text-blue-300">
                   <CloudRain size={20} />
                 </motion.div>
               ))}
             </div>
             {/* Panah Penyerapan */}
             <div className="self-end mb-2 flex gap-2">
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <ArrowDown className="text-white w-8 h-8" />
                </motion.div>
                <span className="text-xs self-center text-white">Diserap Tanah (Infiltrasi)</span>
             </div>
          </div>
          <p className="text-sm text-gray-300">Tanah hutan berpori menyerap 90% air hujan, menyimpannya sebagai cadangan air tanah.</p>
        </div>

        {/* KARTU 2: KOTA (Limpasan) */}
        <div className="flex-1 bg-red-900/30 border border-red-500/50 rounded-2xl p-6 relative overflow-hidden group hover:bg-red-900/50 transition">
          <div className="flex items-center gap-2 mb-4 text-red-400 font-bold text-xl">
            <Building2 /> KOTA (Kaca)
          </div>

          {/* Ilustrasi Animasi */}
          <div className="h-40 bg-gray-800/50 rounded-lg relative mb-4 flex justify-center overflow-hidden">
             {/* Hujan Turun */}
             <div className="absolute top-0 w-full flex justify-around">
               {[1,2,3].map(i => (
                 <motion.div key={i} variants={rainDrop} initial="initial" animate="animate" className="text-blue-300">
                   <CloudRain size={20} />
                 </motion.div>
               ))}
             </div>
             {/* Panah Limpasan (Runoff) */}
             <div className="self-end mb-2 w-full px-4">
                <motion.div 
                  className="flex items-center gap-2 bg-blue-500/20 p-1 rounded"
                  animate={{ x: [-5, 5, -5] }} 
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="text-blue-400 w-8 h-8" />
                  <span className="text-xs text-blue-200">Air Mengalir Deras (Limpasan)</span>
                </motion.div>
             </div>
          </div>
          <p className="text-sm text-gray-300">Beton menutup tanah. Air tidak bisa masuk, akhirnya menggenang dan menyebabkan banjir.</p>
        </div>

      </div>

      {/* Tombol Lanjut */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setPhase('simulation')}
        className="bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold py-3 px-10 rounded-full shadow-lg shadow-blue-500/30 flex items-center gap-2"
      >
        Saya Mengerti, Mulai Simulasi <ArrowRight size={20} />
      </motion.button>
    </div>
  );
}