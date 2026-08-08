"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BuildingAnimation() {
  const [animationKey, setAnimationKey] = useState(0);

  // Restart the animation loop every 9 seconds:
  // - 0.0s - 1.0s: Starting dot scales and pulses
  // - 1.0s - 4.5s: Sketch lines draw (line-by-line)
  // - 4.5s - 5.5s: Building fully solidifies (fades in original image)
  // - 5.5s - 8.5s: Hold completed state
  // - 8.5s - 9.0s: Fade out to restart
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  // Shared transition configurations
  const transitionMedium = { duration: 1.0, ease: "easeInOut" } as const;

  return (
    <div className="relative w-full aspect-square bg-white border-2 border-dashed border-gray-400 flex items-center justify-center overflow-hidden">
      {/* ── Grid Pattern Background ── */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:20px_20px]" />

      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full absolute inset-0 flex items-center justify-center"
        >
          {/* ── Animated SVG sketch lines and mask ── */}
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full p-4 absolute inset-0 z-0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* ── Reveal Mask ── */}
              {/* White portions will reveal the original image, black hides it */}
              <mask id="building-reveal-mask">
                {/* Background starts fully black (hidden) */}
                <rect width="500" height="500" fill="black" />

                {/* Pulse node at center bottom (foundation starting dot) */}
                <motion.circle
                  cx="250"
                  cy="365"
                  initial={{ r: 0 }}
                  animate={{ r: [0, 16, 8] }}
                  transition={{ duration: 1.0, times: [0, 0.6, 1], ease: "easeOut" }}
                  fill="white"
                />

                {/* Staggered drawing lines (revealing image underneath) */}
                {/* Base level */}
                <motion.path
                  d="M 250 365 L 110 365"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, ...transitionMedium }}
                />
                <motion.path
                  d="M 250 365 L 390 365"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, ...transitionMedium }}
                />

                {/* Vertical pillars */}
                <motion.path
                  d="M 110 365 L 110 240"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.4, ...transitionMedium }}
                />
                <motion.path
                  d="M 390 365 L 390 240"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.4, ...transitionMedium }}
                />
                <motion.path
                  d="M 250 365 L 250 185"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.6, ...transitionMedium }}
                />
                <motion.path
                  d="M 175 330 L 175 200"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.8, ...transitionMedium }}
                />
                <motion.path
                  d="M 325 330 L 325 200"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.8, ...transitionMedium }}
                />

                {/* Tier 1 Roofs */}
                <motion.path
                  d="M 110 240 L 250 185"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.2, ...transitionMedium }}
                />
                <motion.path
                  d="M 390 240 L 250 185"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.2, ...transitionMedium }}
                />

                {/* Tier 2 Verticals */}
                <motion.path
                  d="M 175 200 L 250 170"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.6, ...transitionMedium }}
                />
                <motion.path
                  d="M 325 200 L 250 170"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 2.6, ...transitionMedium }}
                />

                {/* Tower (Top Tier) */}
                <motion.path
                  d="M 210 185 L 210 100"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 3.2, ...transitionMedium }}
                />
                <motion.path
                  d="M 290 185 L 290 100"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 3.2, ...transitionMedium }}
                />
                <motion.path
                  d="M 210 100 L 250 80"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 3.8, ...transitionMedium }}
                />
                <motion.path
                  d="M 290 100 L 250 80"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 3.8, ...transitionMedium }}
                />

                {/* Stairs */}
                <motion.path
                  d="M 110 330 L 70 365"
                  stroke="white"
                  strokeWidth="16"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 4.2, ...transitionMedium }}
                />

                {/* Final solidification helper in mask */}
                <motion.rect
                  width="500"
                  height="500"
                  fill="white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4.8, duration: 1.2, ease: "easeOut" }}
                />
              </mask>
            </defs>

            {/* ── Masked Image in SVG (For the line-reveal effect) ── */}
            <image
              href="https://lh3.googleusercontent.com/aida-public/AB6AXuCLvpiD9FIrLAs81PYf1UW-vMenSS3xl7VRkGe-BHdMkJ86lM7Z7zxMgh72gPhZJmew4Xf2oWrFeoDq8MkVfGj_fdoBGhz52mQJAx0ssf2-e-ryeQ8qgZ-FimlqJlaXq-DFwp6n9eA5T30F0iQGtnAXTVK360W7KdzPoIR7szkuIWfSujcZ6WiCXvEc2ZsmAT1g16akH13zT4oTA6o9d6Xft5cbbjkiI-piQg5-x0M45Y86aXsLHJDmHmESiVlLfXxtza5zxpYgk45I"
              x="25"
              y="25"
              width="450"
              height="450"
              mask="url(#building-reveal-mask)"
              className="grayscale opacity-80 object-contain"
            />

            {/* ── Visible Blueprint Overlay Sketch Lines ── */}
            <g opacity="0.8">
              {/* Starting Dot */}
              <motion.circle
                cx="250"
                cy="365"
                initial={{ r: 0, fill: "#0066cc", opacity: 1 }}
                animate={{
                  r: [0, 8, 4],
                  fill: ["#0066cc", "#0066cc", "#000000"],
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 5.5, times: [0, 0.15, 0.9], ease: "easeInOut" }}
              />

              {/* Base structure lines */}
              <motion.path
                d="M 250 365 L 110 365"
                stroke="#0066cc"
                strokeWidth="1.5"
                strokeDasharray="2,2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 0.8, ...transitionMedium },
                  opacity: { delay: 4.8, duration: 0.8 },
                }}
                fill="none"
              />
              <motion.path
                d="M 250 365 L 390 365"
                stroke="#0066cc"
                strokeWidth="1.5"
                strokeDasharray="2,2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 0.8, ...transitionMedium },
                  opacity: { delay: 4.8, duration: 0.8 },
                }}
                fill="none"
              />

              {/* Vertical pillars */}
              <motion.path
                d="M 110 365 L 110 240"
                stroke="#0066cc"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 1.4, ...transitionMedium },
                  opacity: { delay: 4.8, duration: 0.8 },
                }}
                fill="none"
              />
              <motion.path
                d="M 390 365 L 390 240"
                stroke="#0066cc"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 1.4, ...transitionMedium },
                  opacity: { delay: 4.8, duration: 0.8 },
                }}
                fill="none"
              />
              <motion.path
                d="M 250 365 L 250 185"
                stroke="#0066cc"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 1.6, ...transitionMedium },
                  opacity: { delay: 4.8, duration: 0.8 },
                }}
                fill="none"
              />
              <motion.path
                d="M 175 330 L 175 200"
                stroke="#0066cc"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 1.8, ...transitionMedium },
                  opacity: { delay: 4.8, duration: 0.8 },
                }}
                fill="none"
              />
              <motion.path
                d="M 325 330 L 325 200"
                stroke="#0066cc"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 1.8, ...transitionMedium },
                  opacity: { delay: 4.8, duration: 0.8 },
                }}
                fill="none"
              />

              {/* Roof lines */}
              <motion.path
                d="M 110 240 L 250 185"
                stroke="#0066cc"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 2.2, ...transitionMedium },
                  opacity: { delay: 4.8, duration: 0.8 },
                }}
                fill="none"
              />
              <motion.path
                d="M 390 240 L 250 185"
                stroke="#0066cc"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 2.2, ...transitionMedium },
                  opacity: { delay: 4.8, duration: 0.8 },
                }}
                fill="none"
              />

              {/* Tier 2 tops */}
              <motion.path
                d="M 175 200 L 250 170"
                stroke="#0066cc"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 2.6, ...transitionMedium },
                  opacity: { delay: 4.8, duration: 0.8 },
                }}
                fill="none"
              />
              <motion.path
                d="M 325 200 L 250 170"
                stroke="#0066cc"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 2.6, ...transitionMedium },
                  opacity: { delay: 4.8, duration: 0.8 },
                }}
                fill="none"
              />

              {/* Tower structure */}
              <motion.path
                d="M 210 185 L 210 100"
                stroke="#0066cc"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 3.2, ...transitionMedium },
                  opacity: { delay: 4.8, duration: 0.8 },
                }}
                fill="none"
              />
              <motion.path
                d="M 290 185 L 290 100"
                stroke="#0066cc"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 3.2, ...transitionMedium },
                  opacity: { delay: 4.8, duration: 0.8 },
                }}
                fill="none"
              />
              <motion.path
                d="M 210 100 L 250 80"
                stroke="#0066cc"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 3.8, ...transitionMedium },
                  opacity: { delay: 4.8, duration: 0.8 },
                }}
                fill="none"
              />
              <motion.path
                d="M 290 100 L 250 80"
                stroke="#0066cc"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 3.8, ...transitionMedium },
                  opacity: { delay: 4.8, duration: 0.8 },
                }}
                fill="none"
              />

              {/* Stair diagonal */}
              <motion.path
                d="M 110 330 L 70 365"
                stroke="#0066cc"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{
                  pathLength: { delay: 4.2, ...transitionMedium },
                  opacity: { delay: 4.8, duration: 0.8 },
                }}
                fill="none"
              />
            </g>
          </svg>

          {/* ── Solidified Clean Overlay Image ── */}
          {/* This fades in standard HTML element to completely reveal the exact original layout and content */}
          <motion.img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLvpiD9FIrLAs81PYf1UW-vMenSS3xl7VRkGe-BHdMkJ86lM7Z7zxMgh72gPhZJmew4Xf2oWrFeoDq8MkVfGj_fdoBGhz52mQJAx0ssf2-e-ryeQ8qgZ-FimlqJlaXq-DFwp6n9eA5T30F0iQGtnAXTVK360W7KdzPoIR7szkuIWfSujcZ6WiCXvEc2ZsmAT1g16akH13zT4oTA6o9d6Xft5cbbjkiI-piQg5-x0M45Y86aXsLHJDmHmESiVlLfXxtza5zxpYgk45I"
            alt="Architecture Blueprint"
            className="w-full h-full object-contain p-4 grayscale opacity-80 absolute inset-0 z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.8, duration: 1.2, ease: "easeOut" }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
