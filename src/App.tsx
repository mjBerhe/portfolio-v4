import "./App.css";
import { cn } from "./lib/utils";
import { motion } from "motion/react";
import { ShootingStars } from "./components/ui/shooting-stars";
import { StarsBackground } from "./components/ui/stars-background";
import { Welcome } from "./components/cards/welcome";
import { Stack } from "./components/cards/stack";

function App() {
  const cardClass =
    "border border-gray-800 bg-gradient-to-br from-gray-900 to-black rounded-xl relative z-100 shadow-2xl h-full";

  //    const test = [3, 2, 1]
  return (
    <main className="h-screen bg-gray-950 w-screen text-white">
      <div className="container mx-auto max-w-[1024px] px-8 h-full">
        <div className="grid grid-cols-9 grid-rows-9 gap-3 pt-12 max-w-[1024px] h-full">
          <motion.div
            initial={{ opacity: 0.8, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(cardClass, "col-span-7 row-span-3")}
          >
            <Welcome />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className={cn(cardClass, "col-span-2 row-span-7")}
          >
            <Stack />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
            className={cn(cardClass, "row-span-1 col-span-5")}
          >
            Card 3
          </motion.div>
          <div className={cn(cardClass, "row-span-2 col-span-2")}></div>
        </div>
      </div>

      <ShootingStars />
      <StarsBackground />
    </main>
  );
}

export default App;
