import Footer from '@/components/Footer';
import { Users, Target, Lightbulb, Medal } from "lucide-react";
import React from 'react'

const page = () => {
    return (
        <>
            <main className="w-full sm:container mx-auto">
                <InnovationHero />
                <PeopleBehind />
            </main>
            <Footer />
        </>
    )
}

export default page

function InnovationHero() {
    return (
        <section className="w-full flex lg:mt-6 justify-center my-14 md:mt-18 md:mb-14 lg:min-h-screen rounded-3xl items-center relative overflow-hidden">
            <div className="h-[calc(100vh-6rem)] md:h-auto  mt-5 sm:mt-0 mx-2 sm:mx-0 lg:h-[calc(100vh-10rem)] w-full relative">

                {/* Background Image */}
                <img
                    src="/blog-page/hero-img.png"
                    alt="Background"
                    className="w-full h-full sm:h-[70vh] md:h-[80vh] object-cover rounded-3xl overflow-hidden   "
                />

                {/* Glass Box */}
                <div
                    className="
          absolute inset-0 w-full h-full
          flex items-center justify-center
          px-4 sm:px-6
        "
                >
                    <div
                        className="
            w-full max-w-4xl xl:max-w-5xl
            bg-white/10 backdrop-blur-2xl 
            rounded-3xl sm:rounded-[30px]
            p-6 sm:p-10 md:p-14 
            border border-white/20
            shadow-[0_0_40px_rgba(255,255,255,0.2)]
            text-center
          "
                    >
                        {/* Title */}
                        <h1
                            className="
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
              font-extrabold 
              text-white leading-snug md:leading-tight
            "
                        >
                            Insights from Akdenar
                        </h1>

                        {/* Subtitle */}
                        <p
                            className="
              text-white/90 
              text-sm sm:text-base md:text-lg
              mt-4 sm:mt-6 
              max-w-2xl mx-auto 
              leading-relaxed
            "
                        >
                            Exploring trends in e-commerce, technology, and corporate services to help you stay
                            ahead in a dynamic business world.                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
}

function PeopleBehind() {
    const items = [
        {
            icon: <Users size={26} className="text-orange-600" />,
            title: "Diverse Expertise",
            desc: "Our team brings together specialists from design, technology, business strategy, and social impact sectors.",
        },
        {
            icon: <Target size={26} className="text-orange-600" />,
            title: "Mission-Focused",
            desc: "Every team member is aligned with our dual mission: technological innovation through Akdenar Labs and community impact through Deshmitra.",
        },
        {
            icon: <Lightbulb size={26} className="text-orange-600" />,
            title: "Innovation-Driven",
            desc: "We encourage creative thinking and bold ideas. Our culture celebrates experimentation and learning from failures.",
        },
        {
            icon: <Medal size={26} className="text-orange-600" />,
            title: "Excellence First",
            desc: "We maintain high standards in everything we do, from code quality to user experience to community engagement.",
        },
    ];

    return (
        <section className="w-full px-6 md:px-12 pb-20 max-w-7xl mx-auto">

            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold">The People Behind Akdenar</h2>
                <p className="text-gray-600 text-sm md:text-base mt-3">
                    We’re not just a company—we’re a collective of dreamers, builders, and
                    problem-solvers united by a shared purpose: to create technology that matters
                    and impact that lasts.
                </p>
            </div>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {items.map((item, i) => (
                    <div
                        key={i}
                        className="
              bg-white border border-gray-200 rounded-2xl 
              p-8 shadow-sm hover:shadow-md transition
              flex gap-4
            "
                    >
                        {/* Icon */}
                        <div className="bg-orange-100 p-3 rounded-full h-fit">
                            {item.icon}
                        </div>

                        {/* Content */}
                        <div>
                            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}

            </div>

        </section>
    );
}
