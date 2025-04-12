import React, { useRef } from "react";
import { useHover } from "usehooks-ts";
import { motion } from "motion/react";

export const Welcome: React.FC = () => {
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(hoverRef as React.RefObject<HTMLDivElement>); // it must be a glitch??

  console.log(isHover);

  const imageVariants = {
    initial: (defaultImg: boolean) => ({
      opacity: defaultImg ? 1 : 0,
      transition: { duration: 0.3 },
    }),
    hover: (defaultImg: boolean) => ({
      opacity: defaultImg ? 0 : 1,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <div className="flex w-full justify-between border h-full" ref={hoverRef}>
      <div>
        <p></p>
      </div>
      <motion.div initial="initial" whileHover="hover" className="relative h-full w-full">
        <motion.img
          src="../images/me_hidden.png"
          variants={imageVariants}
          custom={true}
          className="absolute top-0 left-0 h-full border object-cover"
        />

        <motion.img
          src="../images/me_wave.png"
          variants={imageVariants}
          custom={false}
          className="absolute top-0 left-0 h-full border"
        />
      </motion.div>
      {/* <img src="../images/me_wave.png" className="w-auto h-52" /> */}
    </div>
  );
};
