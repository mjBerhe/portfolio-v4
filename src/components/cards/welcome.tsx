"use client";

import React, { useRef } from "react";
import { useHover } from "usehooks-ts";
import { motion } from "motion/react";

export const Welcome: React.FC = () => {
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(hoverRef as React.RefObject<HTMLDivElement>); // it must be a glitch??

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
    <div className="flex h-full w-full justify-between" ref={hoverRef}>
      <div className="flex w-full flex-col gap-y-2 p-4">
        <p className="text-lg text-gray-300 italic">welcome.</p>
        <p>
          I&apos;m Matt, this is going to be some random text about myself.
          Maybe two sentences? One about what I want to create. And another
          about myself?
        </p>
      </div>
      <motion.div
        initial="initial"
        animate={isHover ? "hover" : "initial"}
        className="relative h-full w-full max-w-[240px]"
      >
        <motion.img
          src="../images/me_hidden.png"
          variants={imageVariants}
          custom={true}
          className="absolute right-[12px] bottom-[-20px] h-[200px] object-cover"
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
