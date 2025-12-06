import Footer from '@/components/Footer';
import {
    Globe2,
    TrendingUp,
    HeartPulse,
    FlaskConical,
    GraduationCap,
    Wallet,
    ShieldCheck,
    Cpu,
    MapPin,
    Clock,
    BriefcaseBusiness,
    Users, Target, Award
} from "lucide-react";

const page = () => {
    return (
        <>
            <main className="w-full sm:container mx-auto">
                <InnovationHero />
                <WhyJoin />
                <OpenPositions />
                <WorkHere />
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
                {/* Background Image */}
                <img
                    src="/career-page/hero-img.png"
                    alt="Background"
                    className="w-full h-full sm:h-[70vh] md:h-[80vh] object-cover"
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
                            Shape the future with
                            <br />
                            us.
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
                            Join a community where your perspective matters. At Akdenar, people from different regions, cultures, and skills come together to co-create solutions that shape a brighter, more connected future.
                        </p>

                    </div>
                </div>
            </div>
        </section>
    );
}

function WhyJoin() {
    const perks = [
        {
            icon: <Globe2 size={26} className="text-blue-600" />,
            title: "Global Impact",
            desc: "Work on projects that affect millions of lives across the world.",
        },
        {
            icon: <TrendingUp size={26} className="text-blue-600" />,
            title: "Career Growth",
            desc: "Continuous learning opportunities and clear paths for advancement.",
        },
        {
            icon: <HeartPulse size={26} className="text-blue-600" />,
            title: "Health & Wellness",
            desc: "Comprehensive health coverage and wellness programs for you and your family.",
        },
        {
            icon: <FlaskConical size={26} className="text-blue-600" />,
            title: "Innovation Culture",
            desc: "Freedom to experiment, fail, and innovate without boundaries.",
        },
        {
            icon: <GraduationCap size={26} className="text-blue-600" />,
            title: "Learning Budget",
            desc: "Annual stipend for courses, conferences, and professional development.",
        },
        {
            icon: <Clock size={26} className="text-blue-600" />,
            title: "Work-Life Balance",
            desc: "Flexible hours, remote options, and unlimited PTO policy.",
        },
        {
            icon: <Wallet size={26} className="text-blue-600" />,
            title: "Competitive Compensation",
            desc: "Industry-leading salaries, equity, and performance bonuses.",
        },
        {
            icon: <ShieldCheck size={26} className="text-blue-600" />,
            title: "Job Security",
            desc: "Stable, growing company with a sustainable business model.",
        },
        {
            icon: <Cpu size={26} className="text-blue-600" />,
            title: "Latest Technology",
            desc: "Work with cutting-edge tools and technologies.",
        },
    ];

    return (
        <section className="w-full px-6 md:px-12 py-20 max-w-7xl mx-auto">

            {/* Heading */}
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold">Why Join Our Team</h2>
                <p className="text-gray-600 text-sm md:text-base mt-3">
                    We offer more than just a job, we provide an opportunity to be part of
                    something meaningful.
                </p>
            </div>

            {/* Perks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {perks.map((item, i) => (
                    <div
                        key={i}
                        className="
              bg-white border border-gray-200 rounded-2xl 
              p-6 shadow-sm 
              hover:shadow-md transition
            "
                    >
                        {/* Icon */}
                        <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                            {item.icon}
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}

            </div>
        </section>
    );
}

function OpenPositions() {
    const positions = [
        {
            title: "Senior Software Engineer",
            team: "Engineering",
            location: "Remote / New York",
            type: "Full-time",
            category: "Engineering",
            desc: "Lead the development of innovative solutions that solve critical real-world problems. Work with cutting-edge technologies and a team of world-class engineers.",
        },
        {
            title: "Product Manager",
            team: "Product",
            location: "San Francisco",
            type: "Full-time",
            category: "Product",
            desc: "Drive product strategy for solutions that impact millions. Collaborate with cross-functional teams to identify and solve pressing global challenges.",
        },
        {
            title: "UX/UI Designer",
            team: "Design",
            location: "Remote",
            type: "Full-time",
            category: "Design",
            desc: "Design intuitive interfaces for products that make a real difference. Join our award-winning design team committed to human-centered solutions.",
        },
        {
            title: "Data Scientist",
            team: "Data & Analytics",
            location: "Boston / Remote",
            type: "Full-time",
            category: "Data & Analytics",
            desc: "Leverage data to uncover insights that drive meaningful impact. Build models and systems that help solve complex real-world problems at scale.",
        },
        {
            title: "Solutions Architect",
            team: "Engineering",
            location: "London",
            type: "Full-time",
            category: "Engineering",
            desc: "Design scalable architectures for mission-critical systems. Work with enterprise clients to deliver solutions that transform industries.",
        },
        {
            title: "Marketing Manager",
            team: "Marketing",
            location: "Remote",
            type: "Full-time",
            category: "Marketing",
            desc: "Tell the story of how we’re changing the world. Create campaigns that showcase our impact and attract top talent to our mission.",
        },
    ];

    return (
        <section className="w-full px-6 md:px-12 py-20 max-w-7xl mx-auto">

            {/* Heading */}
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold">Open Positions</h2>
                <p className="text-gray-600 text-sm md:text-base mt-3">
                    Find your next challenge and join us in creating solutions that matter.
                    We’re always looking for talented individuals who share our passion for impact.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {positions.map((job, i) => (
                    <div
                        key={i}
                        className="
    bg-white border border-gray-200 rounded-xl 
    p-6 shadow-sm hover:shadow-md transition
    flex flex-col
  "
                    >
                        {/* Top Content */}
                        <div className="flex-1">
                            {/* Title */}
                            <h3 className="font-semibold text-lg">{job.title}</h3>

                            {/* Team */}
                            <p className="text-blue-600 font-medium text-sm mt-1">
                                {job.team}
                            </p>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed mt-3">
                                {job.desc}
                            </p>

                            {/* Icons Row */}
                            <div className="flex flex-wrap items-center gap-4 mt-5 text-gray-700 text-sm">
                                <span className="flex items-center gap-1">
                                    <MapPin size={16} className="text-blue-600" />
                                    {job.location}
                                </span>

                                <span className="flex items-center gap-1">
                                    <Clock size={16} className="text-blue-600" />
                                    {job.type}
                                </span>

                                <span className="flex items-center gap-1">
                                    <BriefcaseBusiness size={16} className="text-blue-600" />
                                    {job.category}
                                </span>
                            </div>
                        </div>

                        {/* Button — always at the bottom */}
                        <button
                            className="
      w-full mt-6 
      bg-blue-600 text-white 
      py-2.5 rounded-md 
      font-medium text-sm
      hover:bg-blue-700 transition
    "
                        >
                            Get in touch
                        </button>
                    </div>

                ))}

            </div>
        </section>
    );
}


function WorkHere() {
    const values = [
        {
            icon: <Users size={28} className="text-gray-700" />,
            title: `"Us" Before "I"`,
            desc: "Personal glory takes a backseat to collective impact. We value humility, commitment, and honesty.",
        },
        {
            icon: <Target size={28} className="text-gray-700" />,
            title: "Mission-Driven",
            desc: "Your work contributes not only to business success but to sustainable growth and social impact via Deshmitra.",
        },
        {
            icon: <Award size={28} className="text-gray-700" />,
            title: "Ownership",
            desc: "We trust individuals to own their work. You don't just execute tasks; you are responsible for outcomes.",
        },
    ];

    return (
        <section className="w-full px-6 md:px-12 py-20 max-w-7xl mx-auto">

            {/* Heading */}
            <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl font-bold">What It Means to Work Here</h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {values.map((v, i) => (
                    <div
                        key={i}
                        className="
              bg-white border border-gray-200 rounded-2xl 
              p-8 shadow-sm hover:shadow-md transition
              flex flex-col
            "
                    >
                        {/* Icon */}
                        <div className="mb-5">{v.icon}</div>

                        {/* Title */}
                        <h3 className="font-semibold text-lg mb-2">{v.title}</h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {v.desc}
                        </p>
                    </div>
                ))}

            </div>

        </section>
    );
}
