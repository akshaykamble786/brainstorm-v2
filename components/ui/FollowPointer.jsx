'use client';

import { motion } from "framer-motion";
import stringToColor from "@/lib/stringToColor";

export default function FollowPointer({ x, y, info }) {
    const color = stringToColor(info?.email || '1');
    const displayName = info?.name?.split(' ')[0] || info?.email?.split('@')[0] || '';

    return (
        <motion.div
            className="absolute z-50 select-none pointer-events-none"
            style={{
                top: y,
                left: x,
                transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
        >
            {/* Cursor */}
            <div className="relative">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    className="transform -rotate-[25deg]"
                >
                    <path
                        d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"
                        fill={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                {/* Name Tag */}
                <motion.div
                    className="absolute left-4 top-1 px-3 py-1 rounded-full text-sm font-medium text-white whitespace-nowrap"
                    style={{
                        backgroundColor: color,
                        boxShadow: `0 2px 4px ${color}50`
                    }}
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{
                        duration: 0.2,
                        ease: "easeOut",
                        delay: 0.05
                    }}
                >
                    {displayName}
                </motion.div>
            </div>
        </motion.div>
    );
}