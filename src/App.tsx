import "./App.css";
import { cn } from "./lib/utils";
import { motion } from "motion/react";
import { ShootingStars } from "./components/ui/shooting-stars";
import { StarsBackground } from "./components/ui/stars-background";

function App() {
  //    const test = [3, 2, 1]
  return (
    <main className="h-screen bg-gray-950 w-screen text-white">
      <div className="container mx-auto max-w-[1024px] px-8">
        <div className="flex flex-col gap-y-4 pt-8 max-w-[1024px]">
          <motion.div
            initial={{ opacity: 0.8, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn("border border-gray-700 bg-gradient-to-br from-gray-900 to-black ",
              "rounded-xl relative z-100 p-4 w-full h-[200px] shadow-2xl")}
          >
            Hello, I'm Matt
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}

            className={cn("border border-gray-700 bg-gradient-to-br from-gray-900 to-black ",
              "rounded-xl relative z-100 p-4 w-full h-[200px] shadow-2xl")}>
            Card 2
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}

            className={cn("border border-gray-700 bg-gradient-to-br from-gray-900 to-black ",
              "rounded-xl relative z-100 p-4 w-full h-[200px] shadow-2xl")}>
            Card 3
          </motion.div>

        </div>
      </div>

      <ShootingStars />
      <StarsBackground />
    </main>
  );
}

export default App;
