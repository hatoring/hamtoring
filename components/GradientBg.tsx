"use client";

import { motion } from "framer-motion";

export default function GradientBg() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute -top-[10%] -left-[10%] h-[60%] w-[60%] rounded-full bg-primary/30 blur-[100px]"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute -bottom-[10%] -right-[10%] h-[60%] w-[60%] rounded-full bg-secondary/30 blur-[100px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    x: [0, 50, 0],
                    y: [0, 100, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50%] w-[50%] rounded-full bg-accent/30 blur-[100px]"
            />
        </div>
    );
}
