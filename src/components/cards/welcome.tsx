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
    <div className="flex w-full justify-between h-full" ref={hoverRef}>
      <div className="w-full p-4">
        <p>hello</p>
      </div>
      <motion.div
        initial="initial"
        animate={isHover ? "hover" : "initial"}
        className="relative h-full w-full"
      >
        <motion.img
          src="../images/me_hidden.png"
          variants={imageVariants}
          custom={true}
          className="absolute bottom-[-20px] right-[12px]
           h-[200px] object-cover"
        />

        <motion.img
          src="../images/me_wave.png"
          variants={imageVariants}
          custom={false}
          className="absolute top-0 right-0 h-full"
        />
      </motion.div>
    </div>
  );
};
