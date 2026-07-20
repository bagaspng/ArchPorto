"use client";

// TODO create a how to collection and plce it in them

import { motion, useMotionValue, useSpring } from "framer-motion";
import React from "react";

const SPRING = {
  mass: 0.1, // avoid Controls inertia (how sluggish or responsive the object feels). Lower mass = snappier motion; higher mass = lethargic motion
  damping: 10, // its like the weight of the ball heavier the ball less it will bounce or harder the rubber band the more it will bounce
  stiffness: 131, // like rubber Band the more you strech the more speed it goes back to the original position
};

const SimpleMouseFollow = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);

  const handlePointerMove = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left);
    y.set(e.clientY - bounds.top);
  };

  return (
    <div
      onPointerMove={(e) => {
        handlePointerMove(e);
      }}
      onPointerEnter={() => {
        opacity.set(1);
      }}
      onPointerLeave={() => {
        opacity.set(0);
      }}
      className="relative flex items-center justify-center rounded-4xl bg-black mt-20 size-[500px] cursor-none">
      <h2 className="text-5xl font-black text-white pointer-events-none">HOVER ME</h2>
      <motion.div
        style={{
          x,
          y,
          opacity,
          mixBlendMode: "difference",
          backgroundColor: "white"
        }}
        className="absolute left-[-10px] top-[-10px] z-50 rounded-full size-5 pointer-events-none"></motion.div>
    </div>
  );
};

const SpringMouseFollow = () => {
  const xSpring = useSpring(0, SPRING);
  const ySpring = useSpring(0, SPRING);
  const opacitySpring = useSpring(0, SPRING);
  const scaleSpring = useSpring(0, SPRING);

  return (
    <div
      onPointerMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        xSpring.set(e.clientX - bounds.left);
        ySpring.set(e.clientY - bounds.top);
      }}
      onPointerEnter={() => {
        opacitySpring.set(1);
        scaleSpring.set(1);
      }}
      onPointerLeave={() => {
        opacitySpring.set(0);
        scaleSpring.set(0);
      }}
      className="relative flex items-center justify-center rounded-4xl bg-black mt-20 size-[500px] cursor-none">
      <h2 className="text-5xl font-black text-white pointer-events-none">HOVER ME</h2>
      <motion.div
        style={{
          x: xSpring,
          y: ySpring,
          opacity: opacitySpring,
          scale: scaleSpring,
          mixBlendMode: "difference",
          backgroundColor: "white"
        }}
        className="absolute left-[-20px] top-[-20px] z-50 rounded-full size-10 pointer-events-none"></motion.div>
    </div>
  );
};

const Skiper61 = () => {
  return (
    <section className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      <div
        className="flex h-screen w-full snap-start flex-col items-center justify-center px-5">
        <div className="grid content-start justify-items-center gap-6 text-center">
          <span
            className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
            Mouse follow simple
          </span>
        </div>
        <SimpleMouseFollow />
      </div>
      <div
        className="flex h-screen w-full snap-start flex-col items-center justify-center px-5">
        <div className="grid content-start justify-items-center gap-6 text-center">
          <span
            className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
            Mouse follow with Spring
          </span>
        </div>
        <SpringMouseFollow />
      </div>
    </section>
  );
};

export { SimpleMouseFollow, Skiper61, SpringMouseFollow };
