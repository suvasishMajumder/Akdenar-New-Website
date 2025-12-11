"use client";
import ApplyModal from "@/components/ApplyModel";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Users,
  Target,
  Award,
  Calendar,
  Briefcase,
} from "lucide-react";
import { useState, useEffect } from "react";

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
  );
};

export default page;

function InnovationHero() {
  return (
    <section className="w-full flex lg:mt-6 justify-center my-14 md:mt-18 md:mb-14 lg:min-h-screen rounded-3xl items-center relative overflow-hidden">
      <div className="h-[calc(100vh-6rem)] md:h-auto  mt-5 sm:mt-0 mx-2 sm:mx-0 lg:h-[calc(100vh-10rem)] w-full relative">
        <img
          src="/career-page/hero-img.png"
          alt="Background"
          className="w-full h-full sm:h-[70vh] md:h-[80vh]  rounded-3xl object-cover"
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
              Join a community where your perspective matters. At Akdenar,
              people from different regions, cultures, and skills come together
              to co-create solutions that shape a brighter, more connected
              future.
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
      icon: <Globe2 size={26} className="text-orange-500" />,
      title: "Global Impact",
      desc: "Work on projects that affect millions of lives across the world.",
    },
    {
      icon: <TrendingUp size={26} className="text-orange-500" />,
      title: "Career Growth",
      desc: "Continuous learning opportunities and clear paths for advancement.",
    },
    {
      icon: <HeartPulse size={26} className="text-orange-500" />,
      title: "Health & Wellness",
      desc: "Comprehensive health coverage and wellness programs for you and your family.",
    },
    {
      icon: <FlaskConical size={26} className="text-orange-500" />,
      title: "Innovation Culture",
      desc: "Freedom to experiment, fail, and innovate without boundaries.",
    },
    {
      icon: <GraduationCap size={26} className="text-orange-500" />,
      title: "Learning Budget",
      desc: "Annual stipend for courses, conferences, and professional development.",
    },
    {
      icon: <Clock size={26} className="text-orange-500" />,
      title: "Work-Life Balance",
      desc: "Flexible hours, remote options, and unlimited PTO policy.",
    },
    {
      icon: <Wallet size={26} className="text-orange-500" />,
      title: "Competitive Compensation",
      desc: "Industry-leading salaries, equity, and performance bonuses.",
    },
    {
      icon: <ShieldCheck size={26} className="text-orange-500" />,
      title: "Job Security",
      desc: "Stable, growing company with a sustainable business model.",
    },
    {
      icon: <Cpu size={26} className="text-orange-500" />,
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
            <div className="bg-orange-100 p-3 rounded-full w-fit mb-4">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

interface ShowOpening {
  _id: string;
  title: string;
  location: string;
  type: string;
  workplaceType: string;
  postedAt?: string;
  deadline?: string;
  description: string;
  positions: number;
  experience: {
    min: number;
    max: number;
  };
  skills: string[];
}

function OpenPositions() {
  const [jobs, setJobs] = useState<ShowOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState<ShowOpening | null>(
    null
  );
  const [showApplyForm, setShowApplyForm] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      const data = await response.json();
      if (data.success) {
        setJobs(data.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = (position: ShowOpening) => {
    setSelectedPosition(position);
    setShowApplyForm(true);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatExperience = (exp: { min: number; max: number }) => {
    if (exp.min === 0 && exp.max === 0) return "Fresher";
    if (exp.min === exp.max) return `${exp.min} years`;
    return `${exp.min}-${exp.max} years`;
  };

  if (loading) {
    return (
      <div className="lg:bg-gray-50 p-10 rounded-md">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black">Open Positions</h1>
            <p className="text-gray-600 mt-2">
              Join our mission and build the future
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500">Loading positions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:bg-gray-50 p-10 rounded-md">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black">Open Positions</h1>
          <p className="text-gray-600 mt-2">
            Join our mission and build the future
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No open positions at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
              {jobs.map((opening) => (
                <Card
                  key={opening._id}
                  className="w-full h-full bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl flex flex-col"
                >
                  {/* Header */}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl font-semibold text-black">
                          {opening.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 text-base text-gray-600 mt-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          {opening.location}
                        </CardDescription>
                      </div>

                      {/* Black badge */}
                      <Badge className="px-3 py-1 bg-black text-white rounded-md">
                        {opening.type}
                      </Badge>
                    </div>
                  </CardHeader>

                  {/* Body */}
                  <CardContent className="space-y-4 flex-1">
                    <p className="text-gray-700 line-clamp-3">
                      {opening.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        Posted: {formatDate(opening.postedAt)}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Clock className="w-4 h-4 text-gray-600" />
                        Deadline: {formatDate(opening.deadline)}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Users className="w-4 h-4 text-gray-600" />
                        Positions: {opening.positions}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Briefcase className="w-4 h-4 text-gray-600" />
                        Exp: {formatExperience(opening.experience)}
                      </div>
                    </div>

                    {/* Workplace Type */}
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <BriefcaseBusiness className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">
                        {opening.workplaceType}
                      </span>
                    </div>

                    {/* Skills */}
                    {opening.skills && opening.skills.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-800 font-medium">
                            Required Skills
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {opening.skills.slice(0, 6).map((skill, index) => (
                            <Badge
                              key={index}
                              className="bg-gray-100 text-gray-800 border border-gray-200"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {opening.skills.length > 6 && (
                            <Badge className="bg-gray-100 text-gray-800 border border-gray-200">
                              +{opening.skills.length - 6} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>

                  {/* Footer (Orange Button Only) */}
                  <CardFooter className="mt-auto">
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
                      onClick={() => handleApplyClick(opening)}
                    >
                      Apply Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
      <ApplyModal
        open={showApplyForm}
        onClose={() => setShowApplyForm(false)}
        opening={selectedPosition}
      />
    </div>
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
        <h2 className="text-2xl md:text-3xl font-bold">
          What It Means to Work Here
        </h2>
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
            <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
