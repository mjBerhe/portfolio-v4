import "./App.css";
import { cn } from "./lib/utils";
import { motion } from "motion/react";
import { ShootingStars } from "./components/ui/shooting-stars";
import { StarsBackground } from "./components/ui/stars-background";
import { Welcome } from "./components/cards/welcome";

function App() {
  //    const test = [3, 2, 1]
  return (
    <main className="h-screen bg-gray-950 w-screen text-white">
      <div className="container mx-auto max-w-[1024px] px-8 h-full">
        <div className="grid grid-cols-9 grid-rows-9 gap-3 pt-12 max-w-[1024px] h-full">
          <motion.div
            initial={{ opacity: 0.8, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
              "border border-gray-700 bg-gradient-to-br from-gray-900 to-black",
              "col-span-7 row-span-3 rounded-xl relative z-100 shadow-2xl h-full"
            )}
          >
            <Welcome />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className={cn(
              "border border-gray-700 bg-gradient-to-br from-gray-900 to-black ",
              "col-span-2 row-span-7 rounded-xl relative z-100 p-4 shadow-2xl"
            )}
          >
            Card 2
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
            className={cn(
              "border border-gray-700 bg-gradient-to-br from-gray-900 to-black ",
              "rounded-xl relative z-100 p-4 w-full shadow-2xl row-span-1 col-span-5"
            )}
          >
            Card 3
          </motion.div>
          <div
            className={cn(
              "border border-gray-700 bg-gradient-to-br from-gray-900 to-black",
              "rounded-xl relative z-100 p-4 w-full shadow-2xl row-span-2 col-span-2"
            )}
          ></div>
        </div>
      </div>

      <ShootingStars />
      <StarsBackground />
    </main>
  );
}

export default App;
