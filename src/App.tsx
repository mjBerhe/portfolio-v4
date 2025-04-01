import "./App.css";
import { motion } from "motion/react";
import { ShootingStars } from "./components/ui/shooting-stars";
import { StarsBackground } from "./components/ui/stars-background";

function App() {
  return (
    <main className="h-screen bg-gray-950 w-screen text-white">
      <div className="min-h-screen container mx-auto ">
        <div className="flex flex-col gap-y-4 w-full pt-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-800/50 rounded-xl relative z-100 p-4 w-full h-[200px] bg-gray-900 shadow-xl"
          >
            Card 1
          </motion.div>
          <motion.div className="border border-slate-500 p-4 w-full h-[200px]">
            Card 2
          </motion.div>
        </div>
      </div>

      <ShootingStars />
      <StarsBackground />
    </main>
  );
}

export default App;
