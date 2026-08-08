"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BuildingAnimation() {
  const [animationKey, setAnimationKey] = useState(0);

  // Restart the animation loop every 9 seconds:
  // - 0.0s - 0.8s: Dot appears, reference axes shoot out
  // - 0.8s - 4.2s: Sonar waves sweep, radial mask expands, building grows
  // - 4.2s - 5.4s: Clean building image solidifies (fades in on top)
  // - 5.4s - 8.5s: Hold completed state
  // - 8.5s - 9.0s: Fade out to restart
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

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
          {/* ── Animated SVG Sonar Reveal ── */}
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full p-4 absolute inset-0 z-0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* ── Radial Reveal Mask ── */}
              {/* Expanding white circle reveals the building image from the foundation dot */}
              <mask id="radial-reveal-mask">
                {/* Background starts fully black (hidden) */}
                <rect width="500" height="500" fill="black" />

                {/* Expanding reveal circle centered at foundation base (250, 365) */}
                <motion.circle
                  cx="250"
                  cy="365"
                  fill="white"
                  initial={{ r: 0 }}
                  animate={{ r: 350 }}
                  transition={{ delay: 0.8, duration: 3.4, ease: "easeOut" }}
                />
              </mask>
            </defs>

            {/* ── Reference coordinate axes (thin, slate-blue, dotted) ── */}
            <g opacity="0.4">
              {/* Vertical axis */}
              <motion.path
                d="M 250 365 L 250 50"
                stroke="#0066cc"
                strokeWidth="1"
                strokeDasharray="4,4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              />
              {/* Horizontal axis Left */}
              <motion.path
                d="M 250 365 L 50 365"
                stroke="#0066cc"
                strokeWidth="1"
                strokeDasharray="4,4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              />
              {/* Horizontal axis Right */}
              <motion.path
                d="M 250 365 L 450 365"
                stroke="#0066cc"
                strokeWidth="1"
                strokeDasharray="4,4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              />
            </g>

            {/* ── Masked Building Image inside SVG ── */}
            {/* The image scales up smoothly as the radial mask reveals it */}
            <g mask="url(#radial-reveal-mask)">
              <motion.image
                href="https://lh3.googleusercontent.com/aida-public/AB6AXuCLvpiD9FIrLAs81PYf1UW-vMenSS3xl7VRkGe-BHdMkJ86lM7Z7zxMgh72gPhZJmew4Xf2oWrFeoDq8MkVfGj_fdoBGhz52mQJAx0ssf2-e-ryeQ8qgZ-FimlqJlaXq-DFwp6n9eA5T30F0iQGtnAXTVK360W7KdzPoIR7szkuIWfSujcZ6WiCXvEc2ZsmAT1g16akH13zT4oTA6o9d6Xft5cbbjkiI-piQg5-x0M45Y86aXsLHJDmHmESiVlLfXxtza5zxpYgk45I"
                x="25"
                y="25"
                width="450"
                height="450"
                className="grayscale opacity-80 object-contain"
                initial={{ scale: 0.92, y: 15 }}
                animate={{ scale: 1.0, y: 0 }}
                transition={{ delay: 0.8, duration: 3.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "250px 365px" }}
              />
            </g>

            {/* ── Scanner Sonar Waves (expanding blue circles) ── */}
            {/* Wave 1 */}
            <motion.circle
              cx="250"
              cy="365"
              fill="none"
              stroke="rgba(0, 102, 204, 0.6)"
              strokeWidth="1.5"
              initial={{ r: 0, opacity: 0 }}
              animate={{ r: [0, 350], opacity: [1, 1, 0] }}
              transition={{ delay: 0.8, duration: 3.4, ease: "easeOut" }}
            />
            {/* Wave 2 (delayed, adding visual depth) */}
            <motion.circle
              cx="250"
              cy="365"
              fill="none"
              stroke="rgba(0, 102, 204, 0.3)"
              strokeWidth="1"
              initial={{ r: 0, opacity: 0 }}
              animate={{ r: [0, 350], opacity: [0, 0.8, 0] }}
              transition={{ delay: 1.4, duration: 2.8, ease: "easeOut" }}
            />

            {/* ── Starting Pulse Node (Central Dot) ── */}
            <motion.circle
              cx="250"
              cy="365"
              fill="#0066cc"
              initial={{ r: 0 }}
              animate={{ r: [0, 8, 4], opacity: [1, 1, 0.6] }}
              transition={{ duration: 0.8, times: [0, 0.6, 1], ease: "easeOut" }}
            />
            {/* Outer halo */}
            <motion.circle
              cx="250"
              cy="365"
              fill="none"
              stroke="#0066cc"
              strokeWidth="1"
              initial={{ r: 4, opacity: 1 }}
              animate={{ r: 16, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", repeat: 1 }}
            />
          </svg>

          {/* ── Solidified Clean Overlay Image ── */}
          {/* Fades in to cover everything, displaying the exact pristine layout at the end */}
          <motion.img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLvpiD9FIrLAs81PYf1UW-vMenSS3xl7VRkGe-BHdMkJ86lM7Z7zxMgh72gPhZJmew4Xf2oWrFeoDq8MkVfGj_fdoBGhz52mQJAx0ssf2-e-ryeQ8qgZ-FimlqJlaXq-DFwp6n9eA5T30F0iQGtnAXTVK360W7KdzPoIR7szkuIWfSujcZ6WiCXvEc2ZsmAT1g16akH13zT4oTA6o9d6Xft5cbbjkiI-piQg5-x0M45Y86aXsLHJDmHmESiVlLfXxtza5zxpYgk45I"
            alt="Architecture Blueprint"
            className="w-full h-full object-contain p-4 grayscale opacity-80 absolute inset-0 z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.2, duration: 1.2, ease: "easeOut" }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
