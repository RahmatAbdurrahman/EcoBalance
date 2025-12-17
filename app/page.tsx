"use client";
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { useAppStore } from '../src/store/useAppStore';
import { AnimatePresence, motion } from 'framer-motion';

// Import Phases
import Phase1_Intro from '../src/components/phases/Phase1_Intro';
import Phase3_Simulation from '../src/components/phases/Phase3_Simulation';
import Phase4_Report from '../src/components/phases/Phase4_Report';

// Komponen 3D Sederhana (Placeholder Visual)
function SimpleForestScene() {
  const forestPercent = useAppStore(s => s.forestPercent);
  // Logika visual: Tampilkan jumlah pohon berdasarkan forestPercent
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#5e503f" />
      </mesh>
      {/* Contoh: Render pohon secara conditional */}
      {Array.from({ length: Math.floor(forestPercent) }).map((_, i) => (
         <mesh key={i} position={[(Math.random()-0.5)*20, 0, (Math.random()-0.5)*20]}>
           <coneGeometry args={[0.5, 2, 8]} />
           <meshStandardMaterial color="green" />
         </mesh>
      ))}
    </group>
  );
}

export default function HomePage() {
  const phase = useAppStore((state) => state.phase);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-slate-900">
      
      {/* LAYER 1: 3D Background (Selalu ada tapi bisa berubah angle) */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [0, 10, 20], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <SimpleForestScene />
          <Environment preset="park" />
          <OrbitControls enableZoom={false} autoRotate={phase === 'intro'} />
        </Canvas>
      </div>

      {/* LAYER 2: UI Overlay (Berganti sesuai Phase) */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        <AnimatePresence mode="wait">
          
          {phase === 'intro' && (
            <motion.div key="intro" className="w-full h-full pointer-events-auto"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Phase1_Intro />
            </motion.div>
          )}

          {phase === 'tutorial' && (
            <motion.div key="tutorial" className="w-full h-full bg-black/80 pointer-events-auto flex items-center justify-center text-white">
              {/* Isi dengan komponen Tutorial */}
              <div className="text-center">
                <h2 className="text-3xl">Tutorial: Neraca Air</h2>
                <p>Klik tombol Lanjut untuk masuk simulasi (Placeholder)</p>
                <button onClick={() => useAppStore.getState().setPhase('simulation')} className="mt-4 px-4 py-2 bg-blue-500 rounded">Lanjut</button>
              </div>
            </motion.div>
          )}

          {phase === 'simulation' && (
            <motion.div key="sim" className="w-full h-full"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Phase3_Simulation />
            </motion.div>
          )}

          {phase === 'report' && (
             <motion.div key="report" className="w-full h-full bg-white text-black pointer-events-auto p-10 overflow-y-auto">
               <h1 className="text-4xl font-bold mb-4">Laporan Masa Depan</h1>
               <p>Hasil keputusan Anda...</p>
               <button onClick={() => useAppStore.getState().setPhase('simulation')} className="mt-4 px-4 py-2 bg-gray-200 rounded">Kembali ke Simulasi</button>
             </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}