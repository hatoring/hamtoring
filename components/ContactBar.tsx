"use client";

import { motion } from "framer-motion";
import { Mail, Phone, ExternalLink } from "lucide-react";

export default function ContactBar() {
    const contacts = [
        {
            icon: <Phone className="h-5 w-5" />,
            label: "010-2235-3418",
            href: "tel:01022353418",
            color: "bg-green-100 text-green-600",
        },
        {
            icon: <Mail className="h-5 w-5" />,
            label: "tjfswls@gne.go.kr",
            href: "mailto:tjfswls@gne.go.kr",
            color: "bg-blue-100 text-blue-600",
        },
    ];

    return (
        <section className="py-20 px-6 max-w-2xl mx-auto w-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass rounded-[3rem] p-10 shadow-2xl shadow-primary/5 text-center relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent" />

                <h2 className="text-3xl font-bold text-gray-800 mb-8">함께 이야기 나눠요!</h2>

                <div className="space-y-4">
                    {contacts.map((contact, index) => (
                        <motion.a
                            key={contact.label}
                            href={contact.href}
                            whileHover={{ x: 10 }}
                            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/50 transition-colors group"
                        >
                            <div className={`p-3 rounded-xl ${contact.color} group-hover:scale-110 transition-transform`}>
                                {contact.icon}
                            </div>
                            <span className="text-lg font-medium text-gray-700 flex-1 text-left">{contact.label}</span>
                            <ExternalLink className="h-5 w-5 text-gray-300 group-hover:text-primary transition-colors" />
                        </motion.a>
                    ))}
                </div>

                <p className="mt-12 text-sm text-gray-400 font-light italic">
                    &copy; 2026 손혜림. All rights reserved.
                </p>
            </motion.div>
        </section>
    );
}
