"use client";

import { motion } from "framer-motion";
import { PenTool, Plane, School, BookOpen } from "lucide-react";

const hobbies = [
    {
        title: "필사",
        description: "마음을 정돈하며 한 글자씩 써 내려가는 고요한 시간",
        icon: <PenTool className="h-6 w-6" />,
        color: "bg-pink-100 text-pink-500",
    },
    {
        title: "여행",
        description: "새로운 곳에서의 영감과 낯선 공기가 주는 설렘",
        icon: <Plane className="h-6 w-6" />,
        color: "bg-blue-100 text-blue-500",
    },
    {
        title: "학교 수업",
        description: "아이들과 소통하며 지식을 나누는 열정적인 순간",
        icon: <School className="h-6 w-6" />,
        color: "bg-yellow-100 text-yellow-600",
    },
    {
        title: "배우기",
        description: "멈추지 않는 호기심으로 채워가는 일상의 성장",
        icon: <BookOpen className="h-6 w-6" />,
        color: "bg-purple-100 text-purple-500",
    },
];

export default function InfoGrid() {
    return (
        <section className="py-16 px-6 max-w-4xl mx-auto w-full">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">나의 소소한 즐거움들</h2>
                <div className="h-1.5 w-20 bg-primary mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hobbies.map((hobby, index) => (
                    <motion.div
                        key={hobby.title}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group glass p-8 rounded-3xl cursor-default transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
                    >
                        <div className={`w-12 h-12 rounded-2xl ${hobby.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            {hobby.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{hobby.title}</h3>
                        <p className="text-gray-500 leading-relaxed">{hobby.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
