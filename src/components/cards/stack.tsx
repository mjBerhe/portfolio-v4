import React, { useRef } from "react";
import { useHover } from "usehooks-ts";
// import { motion } from "motion/react";

export const Stack: React.FC = () => {
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(hoverRef as React.RefObject<HTMLDivElement>); // it must be a glitch??

  console.log(isHover);

  return (
    <div className="flex w-full justify-between h-full" ref={hoverRef}>
      <div className="p-4">
        <p className="text-lg italic text-gray-300">the stack.</p>
      </div>
    </div>
  );
};
