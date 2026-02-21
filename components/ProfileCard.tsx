"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Heart } from "lucide-react";

export default function ProfileCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8 py-12 px-6"
        >
            <div className="relative group">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-75 blur-lg group-hover:opacity-100 transition duration-1000"
                ></motion.div>
                <div className="relative h-48 w-48 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <Image
                        src="/profile.png"
                        alt="손혜림 (SON HYERIM)"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <motion.div
                    className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-lg border border-primary/20"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <GraduationCap className="h-6 w-6 text-primary" />
                </motion.div>
            </div>

            <div className="text-center space-y-3">
                <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl">
                    손혜림 <span className="text-primary font-medium text-2xl">(SON HYERIM)</span>
                </h1>
                <div className="flex items-center justify-center gap-2 text-lg text-gray-600 font-medium">
                    <Heart className="h-5 w-5 fill-primary text-primary" />
                    <span>초등학교 교사</span>
                    <span className="text-gray-300">|</span>
                    <span>만 25세</span>
                </div>
                <p className="max-w-md mx-auto text-gray-500 leading-relaxed font-light">
                    아이들과 함께 배우고 성장하는 따뜻한 세상을 꿈꾸는 교사 손혜림입니다.
                    매일의 기록과 배움을 통해 더 넓은 시야를 가지려 노력합니다.
                </p>
            </div>
        </motion.div>
    );
}
