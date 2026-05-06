import React from "react";
import { motion } from "framer-motion";
import { CalendarCheck2, Truck, Wallet2, Gift, ArrowDownRight } from "lucide-react";
import HowWorksHero from "../components/how-works/HowWorksHero";
import SectionHeader from "../components/ui/SectionHeader";
import { useNavigate } from "react-router-dom";

const steps = [
    {
        title: "Schedule Pickup",
        description:
            "Book via WhatsApp, App, Call, or Website at your convenience.",
        icon: <CalendarCheck2 className="w-8 h-8" />,
        color: "from-blue-500 to-indigo-600",
    },
    {
        title: "Free Pickup",
        description: "Our team collects from your doorstep, absolutely free.",
        icon: <Truck className="w-8 h-8" />,
        color: "from-green-500 to-emerald-600",
    },
    {
        title: "Instant Payment",
        description: "Get paid instantly via Cash or UPI after collection.",
        icon: <Wallet2 className="w-8 h-8" />,
        color: "from-orange-500 to-red-500",
    },
    {
        title: "Rewards",
        description:
            "Complete 10 orders & unlock exclusive rewards & offers!",
        icon: <Gift className="w-8 h-8" />,
        color: "from-pink-500 to-purple-600",
    },
];

const HowWorks = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50  relative overflow-hidden">
            <HowWorksHero />
            {/* Background decorations */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>

            <div id="how-it-works-steps" className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >

                    <h2 className="text-gray-900 font-extrabold text-5xl md:text-6xl tracking-tight mt-10">
                        <SectionHeader

                            title="How it Works "
                            subtitle={""}
                        // className="mb-6 sm:mb-8"
                        />
                    </h2>

                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative mb-20">
                    {/* Flowing connection line */}
                    <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 rounded-full z-0 opacity-60"></div>

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 60, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.7,
                                delay: idx * 0.2,
                                type: "spring",
                                stiffness: 100
                            }}
                            viewport={{ once: true }}
                            className="relative z-10"
                        >
                            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 text-center border border-white/50 group hover:-translate-y-4 hover:rotate-1">
                                {/* Floating step number */}
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl border-4 border-white group-hover:scale-110 transition-all duration-300">
                                        {idx + 1}
                                    </div>
                                </div>

                                {/* Icon container with enhanced styling */}
                                <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    {step.icon}
                                </div>

                                {/* Enhanced content */}
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-base leading-relaxed">
                                    {step.description}
                                </p>

                                {/* Mobile flow indicator */}
                                {idx !== steps.length - 1 && (
                                    <div className="lg:hidden flex justify-center mt-8">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center animate-bounce">
                                            <ArrowDownRight className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Enhanced CTA section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500
 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12"></div>

                        <div className="relative z-10">
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Wardrobe?</h3>
                            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                                Join over 10,000+ satisfied customers who have already converted their unused clothes into instant cash!
                            </p>
                            <button
                                onClick={() => navigate("/schedule")}
                                className="bg-white text-blue-600 font-bold px-10 py-4 rounded-2xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg"
                            >
                                Start Your Journey Now →
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HowWorks;
