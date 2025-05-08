"use client";

// import "./App.css";
import { cn } from "~/lib/utils";
import { motion } from "motion/react";
import { ShootingStars } from "~/components/ui/shooting-stars";
import { StarsBackground } from "~/components/ui/stars-background";
import { Welcome } from "~/components/cards/welcome";
import { Stack } from "~/components/cards/stack";
import { Spotify } from "~/components/cards/spotify";

const cardClass =
  "border border-gray-800 bg-gradient-to-br from-gray-900 to-black rounded-xl relative z-100 shadow-2xl h-full";

function App() {
  return (
    <main className="h-screen w-screen bg-gray-950 text-white">
      <div className="container mx-auto h-full max-w-[1024px] px-8">
        <div className="grid h-full max-w-[1024px] grid-cols-9 grid-rows-9 gap-3 pt-12">
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
            className={cn(cardClass, "col-span-5 row-span-2", "border-none")}
          >
            <Spotify />
          </motion.div>
          <div className={cn(cardClass, "col-span-2 row-span-2")}></div>
        </div>
      </div>

      <ShootingStars />
      <StarsBackground />
    </main>
  );
}

export default App;
