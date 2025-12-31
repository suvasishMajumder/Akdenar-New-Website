"use client";
import Footer from "@/components/Footer";
import { Heart, Lightbulb } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const page = () => {
  return (
    <>
      <main className="w-full sm:container mx-auto">
        <InnovationHero />
        <CompanyOverview />
        <TwoEngines />
        <GlobalVision />
        <CoreValues />
        <Leadership />
      </main>
      <Footer />
    </>
  );
};

export default page;

function InnovationHero() {
  return (
    <section className="w-full flex lg:mt-6 justify-center my-14 md:mt-18 md:mb-14 lg:min-h-screen rounded-3xl items-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="h-[calc(100vh-6rem)] md:h-auto  mt-5 sm:mt-0 mx-2 sm:mx-0 lg:h-[calc(100vh-10rem)] w-full relative"
      >
        {/* Background Image */}
        <img
          src="/about-page/hero-img.png"
          alt="Background"
          className="h-full w-full object-cover rounded-3xl overflow-hidden"
        />

        {/* Glass Box */}
        <div
          className="
          absolute inset-0 w-full h-full
          flex items-center justify-center
          px-4 sm:px-6
        "
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
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
              Driven by Innovation,
              <br />
              Powered by People.
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
              At Akdenar, we don’t just build technology; we build institutions
              that stand the test of time. By merging the high-tech velocity of
              Akdenar Labs with the social soul of Deshmitra, we are shaping a
              future that is efficient, trusted, and inclusive.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function CompanyOverview() {
  return (
    <section className="w-full px-6 md:px-12 py-16 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Breadcrumb */}
          <span className="text-blue-600 font-medium text-sm">
            About Akdenar
          </span>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Company Overview
          </h2>

          {/* Subheading */}
          <h3 className="text-lg font-semibold mb-3">
            Building for the Long Term
          </h3>

          {/* Description */}
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Akdenar operates at the intersection of cutting-edge technology and
            deep social impact. We are an ecosystem of builders — comprising
            Akdenar Labs, our innovation engine for intelligent products and
            Aurora OS, and Deshmitra, our community-focused arm dedicated to
            sustainable development.
            <br />
            <br />
            We believe that only the paranoid survive, which is why we
            constantly reinvent ourselves. We don’t just chase trends; we build
            resilient systems. Whether it’s rapid prototyping in our Innovation
            Studio or mapping health needs in underserved regions, our focus
            remains the same: creating lasting value for people and the planet.
          </p>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center md:justify-end"
        >
          <img
            src="/about-page/company-overview.png"
            alt="Company Overview"
            className="rounded-3xl w-full max-w-md object-cover shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}

function TwoEngines() {
  return (
    <section className="w-full px-6 md:px-12 py-20 max-w-7xl mx-auto overflow-hidden">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          Two Engines, One Mission
        </h2>
        <p className="text-gray-600 mt-3 text-sm md:text-base">
          We drive progress through two distinct but interconnected pathways:
          grassroots impact and high-velocity innovation.
        </p>
      </motion.div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-12 mb-20">
        {/* ---------- LEFT BLOCK: Deshmitra Text ---------- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-100 text-green-600 p-2 rounded-full">
              <Heart className=" text-green-500 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Deshmitra</h3>
              <p className="text-gray-600 text-sm">
                Impact That Touches Every Community
              </p>
            </div>
          </div>

          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-5">
            Deshmitra is the heart of our social commitment. It is not just a
            CSR initiative; it is a dedicated operation focused on lifting
            underserved regions through data-driven development.
          </p>

          <ul className="text-gray-700 text-sm md:text-base space-y-3">
            {[
              { title: "Listening First:", desc: "We believe solutions start with understanding. Deshmitra recently launched a nationwide survey to map local health and infrastructure needs across rural communities." },
              { title: "Measurable Action:", desc: "We prioritize projects that offer tangible results—whether it’s improving local healthcare access or creating sustainable economic opportunities." },
              { title: "The Goal:", desc: "To ensure that as the world advances, no community is left behind." },
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-start gap-2"
              >
                <span className="text-green-600 text-lg">✔</span>
                <p>
                  <strong>{item.title}</strong> {item.desc}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* ---------- RIGHT CARD: Deshmitra Logo ---------- */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-sm rounded-3xl border border-gray-200 shadow-sm
                    p-10 flex items-center h-80 justify-center bg-gradient-to-b from-white to-[#e9e7ff]"
        >
          {" "}
          <img
            src="/deshmitra-logo.svg"
            alt="Deshmitra"
            className="w-64 md:w-72"
          />
        </motion.div>
      </div>

      {/* SECOND ROW */}
      <div className="flex lg:flex-row flex-col-reverse justify-center items-center gap-12">
        {/* ---------- LEFT CARD: Akdenar Labs Logo ---------- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className=""
        >
          <div
            className="w-full h-80 max-w-sm rounded-3xl border border-gray-200 shadow-sm
                    p-10 flex items-center justify-center bg-gradient-to-b from-white to-[#e9e7ff]"
          >
            <img
              src="/lab-logo.svg"
              alt="Akdenar Labs"
              className="w-64 md:w-72"
            />
          </div>
        </motion.div>

        {/* ---------- RIGHT BLOCK: Akdenar Labs Text ---------- */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
              <Lightbulb className="text-blue-500 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Akdenar Labs</h3>
              <p className="text-gray-600 text-sm">
                Where Ideas Become Innovation
              </p>
            </div>
          </div>

          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-5">
            Akdenar Labs is our R&D powerhouse, designed to build intelligent
            products that solve complex problems. It is where we experiment,
            fail fast, and build the future.
          </p>

          <ul className="text-gray-700 text-sm md:text-base space-y-3">
            {[
              { title: "The Innovation Studio:", desc: "A creative sandbox for rapid prototyping and research, turning abstract concepts into market-ready products." },
              { title: "Aurora OS 2.0:", desc: "Our flagship technology update introducing contextual interfaces and smart UX patterns." },
              { title: "The Focus:", desc: "Merging emerging technologies with human-centric design to create products that feel intuitive and inclusive." },
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-start gap-2"
              >
                <span className="text-blue-600 text-lg">✔</span>
                <p>
                  <strong>{item.title}</strong> {item.desc}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function GlobalVision() {
  return (
    <section className="w-full px-6 md:px-12 py-20 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT IMAGE BLOCK */}
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            src="/about-page/vision1.png"
            alt="Office"
            className="w-full md:w-1/2 rounded-2xl shadow-md object-cover h-60 md:h-72"
          />
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            src="/about-page/vision2.png"
            alt="Team"
            className="w-full md:w-1/2 mt-12 rounded-2xl shadow-md object-cover h-60 md:h-72"
          />
        </div>

        {/* RIGHT TEXT BLOCK */}
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            Global Vision, Local Roots
          </h2>

          <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-4 mb-6">
            While our ambitions are global, our approach is deeply personal. We
            operate with the speed of a startup and the maturity of a legacy
            institution. From our innovation hubs to our field offices, we
            co-create solutions that work in specific local contexts.
          </p>

          <ul className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
            {[
              { title: "Headquarters:", desc: "New Delhi, India (The heart of our operations)." },
              { title: "Regional Offices:", desc: "Gujarat, Bihar." },
              { title: "Active Projects:", desc: "40+ In Different Domain" },
              { title: "Remote Team Members:", desc: "Working from multiple states" },
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-start gap-2"
              >
                <span className="text-blue-600 text-lg">•</span>
                <p>
                  <strong>{item.title}</strong> {item.desc}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function CoreValues() {
  const values = [
    {
      icon: "/about-page/core-value1.svg",
      title: "Impact First",
      desc: "We measure success by the positive change we create in the world, not just by profit or growth metrics.",
    },
    {
      icon: "/about-page/core-value2.svg",
      title: "Best People",
      desc: "We attract and nurture exceptional talent, believing that great people create great solutions.",
    },
    {
      icon: "/about-page/core-value3.svg",
      title: "Integrity & Trust",
      desc: "We operate with complete transparency and hold ourselves to the highest ethical standards.",
    },
  ];

  return (
    <section className="w-full px-6 md:px-12 py-10 max-w-7xl mx-auto">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
        <p className="text-gray-600 text-sm md:text-base mt-3">
          The principles that guide our decisions and define our culture.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {values.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="
              bg-white border border-gray-200 rounded-2xl 
              p-8 shadow-sm 
              hover:shadow-md transition
            "
          >
            {/* Icon */}
            <div className="bg-blue-100 text-blue-600 rounded-full w-fit mb-4">
              <img src={item.icon} />
            </div>

            {/* Title */}
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Leadership() {
  const leaders = [
    {
      img: "/about-page/CEO.png",
      name: "Rakesh Mishra",
      role: "CEO & Founder",
      desc: "Second-generation trader with 15+ years running a profitable nationwide distribution network, connecting 500+ manufacturers, dealers, and exporters.",
    },
    {
      img: "/about-page/CTO.png",
      name: "Nitish Mishra",
      role: "CTO & COO",
      desc: "Former fintech engineering lead specializing in scalable, secure, AI-powered platforms.",
    },
  ];

  return (
    <section className="w-full px-6 md:px-12 py-10 max-w-6xl mx-auto text-center">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold"
      >
        Led by Visionaries
      </motion.h2>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-600 text-sm md:text-base mt-3 mb-16 max-w-2xl mx-auto"
      >
        Our leadership team brings decades of experience from leading technology
        companies, nonprofits, and academia—all united by a passion for impact.
      </motion.p>

      {/* Leader Cards */}
      <div className="flex flex-col md:flex-row items-start gap-x-5 justify-center">
        {leaders.map((leader, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="flex flex-col items-center max-w-xs"
          >
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full  overflow-hidden border border-gray-200 shadow-md">
              <img
                src={leader.img}
                alt={leader.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <h3 className="font-semibold text-lg mt-4">{leader.name}</h3>

            {/* Role */}
            {leader.role && (
              <p className="text-blue-600 text-sm font-medium mt-1">
                {leader.role}
              </p>
            )}

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mt-3">
              {leader.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
