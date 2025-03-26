import "./App.css";
import { motion } from "motion/react";

function App() {
  return (
    <main className="h-screen bg-black w-screen text-white">
      <div className="container border border-white mx-auto p-6">
        <motion.div
          animate={{ scale: 0.5 }}
          className="border border-slate-500 p-4 my-4"
        >
          example box
        </motion.div>
      </div>
    </main>
  );
}

export default App;
