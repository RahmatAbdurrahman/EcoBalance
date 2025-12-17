import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';

export default function Phase1_Intro() {
  const setPhase = useAppStore((state) => state.setPhase);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gradient-to-b from-green-900 to-black text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold mb-4">Sumatra: The Sponge</h1>
        <p className="text-xl max-w-2xl mb-8 text-gray-300">
          Hutan Sumatra bukan sekadar pohon. Ia adalah spons raksasa yang menahan air. 
          Apa yang terjadi jika kita melapisi spons tersebut dengan semen?
        </p>
        <button 
          onClick={() => setPhase('tutorial')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
        >
          Mulai Investigasi
        </button>
      </motion.div>
    </div>
  );
}