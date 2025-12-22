import Footer from "@/components/Footer";
import Link from "next/link";

const page = () => {
  return (
    <>
      <main className="w-full sm:container mx-auto">
        <HeroSection />
        <VerticalsSection />
        <MissionVision />
        <CultureValues />
        <OurJourney />
        <WorkingAtAkdenar />
      </main>
      <Footer />
    </>
  );
};

export default page;

function HeroSection() {
  return (
    <section className="w-full flex lg:mt-6 justify-center my-14 md:mt-18 md:mb-14 lg:min-h-screen items-center relative overflow-hidden">
      <div className="h-[calc(100vh-6rem)] md:h-auto  mt-5 sm:mt-0 mx-2 sm:mx-0 lg:h-[calc(100vh-10rem)] w-full relative">
        <img
          src="/home-page/hero-section-image.png"
          alt=""
          className="h-full w-full object-cover rounded-3xl overflow-hidden"
        />
        {/* Glassmorphism Text Overlay */}
        <div className="absolute top-0  left-0 w-full md:w-1/2 h-full ">
          <div className="p-8 md:p-10 flex flex-col justify-center items-center bg-white/10 backdrop-blur-2xl rounded-3xl h-full ">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Akdenar isn&apos;t just a name
              <br />
              <span className="text-white/95 font-semibold">
                it stands for trust
              </span>
              <br />
              <span className="text-white/95 font-semibold">
                and efficiency.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-white/90 text-base md:text-lg leading-relaxed">
              Akdenar is a dynamic parent company dedicated to building and
              scaling innovative Verticals in instant commerce and multi-domain
              services.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-10 w-full">
              <Link
                href="/about"
                className="
                                bg-orange-500 text-white px-8 py-3.5 rounded-full text-sm font-semibold
                                transition-all duration-300 hover:bg-orange-600 hover:scale-105
                                shadow-[0_4px_20px_rgba(255,140,0,0.5)]
                                border border-orange-400/50
                            "
              >
                Explore
              </Link>

              <Link
                href="/contact"
                className="
                                bg-white/20 text-white px-8 py-3.5 rounded-full text-sm font-semibold
                                backdrop-blur-sm
                                border border-white/30
                                transition-all duration-300 
                                hover:bg-white/30 hover:scale-105
                                shadow-lg
                            "
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VerticalsSection() {
  const verticals = [
    {
      logo: "/deshmitra-logo.svg",
      title: "Deshmitra",
      points: [
        "Impact that touches every community.",
        "Community-focused arm dedicated to social improvement.",
        "Prioritizing projects that deliver measurable impact.",
        "Nationwide surveys to map health needs & development.",
      ],
    },
    {
      logo: "/lab-logo.svg",
      title: "Akdenar Labs",
      points: [
        "Technology & R&D engine of Akdenar.",
        "Accelerates ideas into market-ready intelligent products.",
        "Innovation Studio: rapid prototyping & cross-discipline research.",
        "Aurora OS 2.0: contextual UX-driven platform with smart patterns.",
      ],
    },
  ];

  return (
    <section className="w-full flex flex-col items-center px-3 md:px-10 ">
      <h2 className="text-3xl font-bold mb-12 text-center">Our Verticals</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {verticals.map((item, index) => (
          <div
            key={index}
            className="rounded-xl p-8 bg-[#F8FAFC] border border-gray-200 shadow-inner hover:shadow-xl transition hover:bg-white"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={item.logo}
                className="h-6 md:h-9 w-auto"
                alt={item.title}
              />
            </div>

            {/* Body */}
            <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
              {item.points.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="w-full px-2 md:px-12 py-16 flex flex-col gap-20 ">
      {/* ------------------ MISSION ------------------ */}
      <div className="bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-gray-200">
        <div className="inline-flex flex-col mt-6 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
          <div className="h-1 bg-orange-500 rounded-full mt-2"></div>
        </div>
        <div className="flex items-center lg:flex-row flex-col gap-20 justify-center">
          {/* Text */}
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            To build reliable, accessible, and technology-driven solutions that
            simplify everyday life in India.
            <br />
            <br />
            We aim to empower individuals, businesses, and communities by
            creating digital ecosystems that deliver convenience, efficiency,
            and high-quality services across commerce, innovation, and
            multi-domain operations. Through integrity, innovation, and
            customer-centricity, we strive to positively impact millions of
            lives while fostering sustainable growth and opportunities.
          </p>

          {/* Illustration */}
          <img
            src="/home-page/ourmission1.png"
            alt=" our mission image"
            className="h-80"
          />
        </div>

        {/* ------------------ VISION ------------------ */}

        <div className="inline-flex flex-col mt-6 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold">Our Vision</h2>
          <div className="h-1 bg-orange-500 rounded-full mt-2"></div>
        </div>

        <div className="flex items-center lg:flex-row flex-col-reverse gap-20 justify-center">
          {/* Illustration */}
          <img
            src="/home-page/ourmission2.png"
            alt="our vision"
            className="h-80 order-last md:order-first"
          />

          {/* Text */}
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            To become one of India’s most trusted and forward-thinking
            conglomerates, shaping the future through innovation, speed, and
            service excellence.
            <br />
            <br />
            We aspire to lead in the sectors we operate in—rapid commerce,
            digital services, and technological development—while continuously
            expanding into new domains that enhance modern living.
            <br />
            <br />
            Our long-term vision is to create a unified network of platforms
            that enrich everyday experiences, empower local economies, and
            inspire progress across the country.
          </p>
        </div>
      </div>
    </section>
  );
}

function CultureValues() {
  return (
    <section className="w-full py-16 px-6 md:px-12 flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Our Culture & Values
        </h2>
        <p className="text-sm text-gray-600">
          Building a workplace where talent thrives and innovation flourishes
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-16">
        {/* Card 1: Team Members */}
        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="mb-4">
            <h3 className="text-4xl font-bold text-orange-500 mb-1">15+</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              TEAM MEMBERS
            </p>
          </div>
          <h4 className="text-lg font-semibold mb-2">
            Collaborative Environment
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            We work in cross-functional teams where designers, developers, and
            strategists collaborate daily to solve complex challenges.
          </p>
        </div>

        {/* Card 2: Training Hours */}
        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="mb-4">
            <h3 className="text-4xl font-bold text-orange-500 mb-1">100+</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              TRAINING HOURS/YEAR
            </p>
          </div>
          <h4 className="text-lg font-semibold mb-2">Continuous Learning</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Professional development is part of our DNA. We provide resources,
            mentorship, and opportunities to learn new skills.
          </p>
        </div>

        {/* Card 3: Team Satisfaction */}
        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="mb-4">
            <h3 className="text-4xl font-bold text-orange-500 mb-1">4.8/5</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              TEAM SATISFACTION
            </p>
          </div>
          <h4 className="text-lg font-semibold mb-2">Work-Life Balance</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            We believe great work comes from well-rested minds. Flexible
            schedules and remote work options keep our team energized.
          </p>
        </div>
      </div>

      <div className="text-center max-w-3xl mb-8">
        <p className="text-sm text-gray-600 mb-2">
          Our guiding cardinal principles at Akdenar
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Only the paranoid survive
        </h2>
      </div>

      {/* First Div: Our Foundations - What We Stand For */}
      <div className="w-full max-w-5xl mb-16">
        <h3 className="text-2xl font-bold mb-6">
          Our Foundations: What We Stand For
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Text Content */}
          <div className="text-gray-700 leading-relaxed text-sm md:text-base space-y-4">
            <p>
              At Akdenar, our culture is grounded in principles that define how
              we work, how we create, and how we grow together.
            </p>

            <ul className="space-y-3 list-none">
              <li className="flex gap-2">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>
                  <strong>Purpose over Profit</strong> — Every initiative at
                  Akdenar, including Labs and Deshmitra, is built with intention
                  to create lasting value for people, communities, and the
                  ecosystem.
                </span>
              </li>

              <li className="flex gap-2">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>
                  <strong>Curiosity & Continuous Learning</strong> — We grow by
                  asking questions, experimenting, iterating, and learning from
                  both success and failure.
                </span>
              </li>

              <li className="flex gap-2">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>
                  <strong>Empathy & Integrity</strong> — Respect, honesty, and
                  transparency guide how we work, communicate, and collaborate.
                </span>
              </li>

              <li className="flex gap-2">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>
                  <strong>Ownership & Accountability</strong> — We trust
                  individuals to take responsibility for their work and
                  contribute meaningfully to shared outcomes.
                </span>
              </li>

              <li className="flex gap-2">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>
                  <strong>Sustainability & Long-Term Thinking</strong> — We
                  prioritize responsible decisions and long-term impact over
                  short-term gains.
                </span>
              </li>

              <li className="flex gap-2">
                <span className="text-orange-500 font-bold mt-1">•</span>
                <span>
                  <strong>Collaboration & Inclusivity</strong> — Diverse
                  perspectives and inclusive collaboration across teams
                  strengthen outcomes.
                </span>
              </li>
            </ul>
          </div>

          {/* Right: Person Image */}
          <div className="flex justify-center items-start">
            <img
              src="/person.png"
              alt="Our Foundation"
              className=" w-full max-w-sm object-contain"
            />
          </div>
        </div>
      </div>

      {/* Second Div: If you are an employee at Akdenar */}
      <div className="w-full max-w-5xl mb-16">
        <h3 className="text-xl font-bold mb-6">
          If you are an employee at Akdenar, or are considering working at
          Akdenar, please remember that...
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/girl1.png"
                alt="Team member 1"
                className="w-full h-48 aspect-square rounded-lg object-contain"
              />
              <img
                src="/girl2.png"
                alt="Team member 2"
                className="w-full h-45 aspect-square rounded-lg object-contain"
              />
            </div>

            <div className="text-sm text-gray-700 leading-relaxed space-y-3">
              <p className="font-semibold text-base">
                to push you beyond comfort...
              </p>
              <p>
                We don&apos;t hire to keep you safe. We hire to challenge you,
                to push you into situations where you can expand who you
                are—intellectually, professionally, and sometimes even
                emotionally. But this isn&apos;t arbitrary. We push because we
                believe you&apos;re capable. And sometimes you&apos;ll need to
                push back—and that&apos;s OK. If you grow here, it&apos;s your
                win, not ours. You own that.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/girl3.png"
                alt="Team member 3"
                className="w-full h-48 aspect-square rounded-lg object-contain mt-20"
              />
              <img
                src="/girl4.png"
                alt="Team member 4"
                className="w-full h-48 aspect-square rounded-lg object-contain mt-49"
              />
            </div>

            <div className="text-sm text-gray-700 leading-relaxed space-y-3">
              <p className="font-semibold text-base">
                ...and for you to fail in love with the journey
              </p>
              <p>
                We want every Akdenar line writer to come each day not out of
                duty, but because the problem excites you. When you&apos;re
                deeply invested in a mission, it changes the output and whether
                you stay through obstacles. We want you to feel deeply aligned
                with the &apos;why&apos; behind your work. If you don&apos;t —
                let&apos;s talk.
              </p>
              <p>
                If you can&apos;t name one meaningful contribution you made last
                quarter, it&apos;s time to re-evaluate. Work is too precious to
                drift.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Third Div: Us before I */}
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side: Text */}
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <p className="font-semibold text-2xl mb-4">
              &quot;Us&quot; before &quot;I&quot;
            </p>
            <p>
              At Akdenar, don&apos;t shy away from the collective. You&apos;re a
              mountain climber, not a lone wolf. Collaboration isn&apos;t
              soft—it&apos;s the sharpest competitive advantage we have. You
              bring your brilliance; your teammates bring theirs. Together, we
              dominate the market. Individually? We stall.
            </p>
            <p>
              We don&apos;t hire stars to be stars. We hire them to be
              multipliers. If you&apos;re the smartest person in the room and
              hiding the playbook or hoarding the credit, you&apos;ve violated
              our most fundamental tenet. Coaching, mentoring, and ruthlessly
              pursuing team velocity—that&apos;s how we win.
            </p>
          </div>

          {/* Right Side: Mountain Image */}
          <div className="flex justify-center">
            <img
              src="/Mountain.png"
              alt="Mountain - teamwork"
              className="w-full max-w-md rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function OurJourney() {
  const timeline = [
    {
      year: "2015",
      title: "The Beginning",
      desc: "Founded by five engineers passionate about using technology for social good. Completed our first project helping 10,000 farmers access weather data.",
    },
    {
      year: "2017",
      title: "Global Expansion",
      desc: "Opened offices in London and Singapore. Launched our education initiative reaching 100,000 students in underserved communities.",
    },
    {
      year: "2019",
      title: "Major Breakthrough",
      desc: "Developed AI-powered healthcare diagnosis system deployed in 500+ clinics across Africa and Asia, serving 5 million patients.",
    },
    {
      year: "2021",
      title: "Sustainability Focus",
      desc: "Launched renewable energy projects reducing carbon emissions by 2 million tons annually. Team grew to 300+ professionals.",
    },
    {
      year: "2023",
      title: "Industry Recognition",
      desc: "Named 'Most Impactful Tech Company' by Global Innovation Forum. Surpassed 50 million lives impacted milestone.",
    },
    {
      year: "2024",
      title: "Continued Growth",
      desc: "Expanded to 500+ team members across 30 countries. Launched 5 new flagship projects addressing climate, healthcare, and education challenges.",
    },
  ];

  return (
    <section className="w-full px-2 md:px-10 flex flex-col items-center">
      {/* Heading */}
      <div className="text-center max-w-2xl mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Journey</h2>
        <p className="text-gray-600 text-sm md:text-base">
          Key milestones in our mission to solve real-world problems.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative w-full max-w-4xl">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-12 top-0 h-full w-[2px] bg-gray-300"></div>

        <div className="space-y-10">
          {timeline.map((item, index) => (
            <div key={index} className="relative pl-20 md:pl-28">
              {/* Dot (Year Circle) */}
              <div className="absolute left-3 md:left-7 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold shadow-md">
                {item.year}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkingAtAkdenar() {
  return (
    <section className="w-full px-6 md:px-12 py-20">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Working at Akdenar
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        {/* Left Content */}
        <div>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 max-w-md">
            At Akdenar Company, we unite highly skilled professionals from
            diverse regions across India, fostering a collaborative environment
            where innovation, expertise, and creativity come together. By
            leveraging varied perspectives and deep domain knowledge, our teams
            consistently deliver high-quality, forward-thinking solutions that
            drive exceptional results for our clients and partners.
          </p>

          {/* <Link
            href="/about"
            className="px-6 py-2 rounded-md bg-orange-500 text-white font-medium shadow hover:bg-orange-600 transition inline-block"
          >
            Explore
          </Link> */}
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/home-page/team.png"
            alt="Working at Akdenar"
            className="w-full max-w-md rounded-2xl shadow-md object-cover"
          />
        </div>
      </div>
    </section>
  );
}
