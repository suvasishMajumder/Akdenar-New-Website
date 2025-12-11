"use client";
import Footer from "@/components/Footer";
import { Users, Target, Lightbulb, Medal, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <>
      <main className="w-full sm:container mx-auto">
        <BlogTabs />
      </main>
      <Footer />
    </>
  );
};

export default page;

// function InnovationHero() {
//   return (
//     <section className="w-full flex lg:mt-6 justify-center my-14 md:mt-18 md:mb-14 lg:min-h-screen rounded-3xl items-center relative overflow-hidden">
//       <div className="h-[calc(100vh-6rem)] md:h-auto  mt-5 sm:mt-0 mx-2 sm:mx-0 lg:h-[calc(100vh-10rem)] w-full relative">
//         {/* Background Image */}
//         <img
//           src="/blog-page/hero-img.png"
//           alt="Background"
//           className="w-full h-full sm:h-[70vh] md:h-[80vh] object-cover rounded-3xl overflow-hidden   "
//         />

//         {/* Glass Box */}
//         <div
//           className="
//           absolute inset-0 w-full h-full
//           flex items-center justify-center
//           px-4 sm:px-6
//         "
//         >
//           <div
//             className="
//             w-full max-w-4xl xl:max-w-5xl
//             bg-white/10 backdrop-blur-2xl
//             rounded-3xl sm:rounded-[30px]
//             p-6 sm:p-10 md:p-14
//             border border-white/20
//             shadow-[0_0_40px_rgba(255,255,255,0.2)]
//             text-center
//           "
//           >
//             {/* Title */}
//             <h1
//               className="
//               text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
//               font-extrabold
//               text-white leading-snug md:leading-tight
//             "
//             >
//               Insights from Akdenar
//             </h1>

//             {/* Subtitle */}
//             <p
//               className="
//               text-white/90
//               text-sm sm:text-base md:text-lg
//               mt-4 sm:mt-6
//               max-w-2xl mx-auto
//               leading-relaxed
//             "
//             >
//               Exploring trends in e-commerce, technology, and corporate services
//               to help you stay ahead in a dynamic business world.{" "}
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function PeopleBehind() {
//   const items = [
//     {
//       icon: <Users size={26} className="text-orange-600" />,
//       title: "Diverse Expertise",
//       desc: "Our team brings together specialists from design, technology, business strategy, and social impact sectors.",
//     },
//     {
//       icon: <Target size={26} className="text-orange-600" />,
//       title: "Mission-Focused",
//       desc: "Every team member is aligned with our dual mission: technological innovation through Akdenar Labs and community impact through Deshmitra.",
//     },
//     {
//       icon: <Lightbulb size={26} className="text-orange-600" />,
//       title: "Innovation-Driven",
//       desc: "We encourage creative thinking and bold ideas. Our culture celebrates experimentation and learning from failures.",
//     },
//     {
//       icon: <Medal size={26} className="text-orange-600" />,
//       title: "Excellence First",
//       desc: "We maintain high standards in everything we do, from code quality to user experience to community engagement.",
//     },
//   ];

//   return (
//     <section className="w-full px-6 md:px-12 pb-20 max-w-7xl mx-auto">
//       {/* Heading */}
//       <div className="text-center max-w-3xl mx-auto mb-16">
//         <h2 className="text-3xl md:text-4xl font-bold">
//           The People Behind Akdenar
//         </h2>
//         <p className="text-gray-600 text-sm md:text-base mt-3">
//           We’re not just a company—we’re a collective of dreamers, builders, and
//           problem-solvers united by a shared purpose: to create technology that
//           matters and impact that lasts.
//         </p>
//       </div>

//       {/* 2x2 Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {items.map((item, i) => (
//           <div
//             key={i}
//             className="
//               bg-white border border-gray-200 rounded-2xl
//               p-8 shadow-sm hover:shadow-md transition
//               flex gap-4
//             "
//           >
//             {/* Icon */}
//             <div className="bg-orange-100 p-3 rounded-full h-fit">
//               {item.icon}
//             </div>

//             {/* Content */}
//             <div>
//               <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 {item.desc}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

function BlogTabs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch blogs on load
  useState(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        if (data.success) {
          // Filter only published blogs for the public page
          const published = data.data.filter((b: any) => b.isPublished);
          setBlogs(
            published.map((b: any) => ({
              title: b.title,
              date: b.publishedAt
                ? new Date(b.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "",
              author: b.author,
              description: b.shortDescription,
              cover:
                b.coverImage ||
                "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=600",
              slug: b.slug,
              tags: b.tags,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };
    fetchBlogs();
  });

  const teamBlogs = [
    {
      title: "How Akdenar Uses AI for Identity Verification",
      date: "Jan 3, 2025",
      author: "Akdenar Engineering Team",
      description:
        "A behind-the-scenes look at building our scalable AI-driven KYC verification engine.",
      cover:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600",
      slug: "#",
    },
    {
      title: "Scaling Microservices with AWS",
      date: "Dec 21, 2024",
      author: "Cloud Team",
      description:
        "Our fault-tolerant architecture designed for millions of users.",
      cover:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981d?q=80&w=600",
      slug: "#",
    },
  ];

  const filterBlogs = (data: any[]) =>
    data.filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const BlogCard = ({ blog }: any) => {
    const router = useRouter();

    return (
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
        <div className="h-48 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blog.cover}
            className="w-full h-full object-cover"
            alt={blog.title}
          />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">
            {blog.title}
          </h3>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <span>{blog.author}</span>
            <span>{blog.date}</span>
          </div>

          <p className="text-gray-600 text-sm mb-6 flex-1 line-clamp-3">
            {blog.description}
          </p>

          <Button
            onClick={() =>
              router.push(
                blog.slug && blog.slug !== "#" ? `/blog/${blog.slug}` : "#"
              )
            }
            className="w-full bg-orange-500 text-white hover:bg-orange-600 rounded-lg py-2 mt-auto"
          >
            Read More →
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* HERO SECTION */}
      <div className="max-w-5xl mx-auto pt-20 pb-8 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Insights & Stories
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore research, engineering breakdowns, product announcements, and
          everything happening at Akdenar.
        </p>
      </div>

      {/* STICKY TABS + SEARCH */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center gap-4">
          {/* Tabs */}
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-2 w-full bg-gray-100 p-1 rounded-xl max-w-xl mx-auto">
              <TabsTrigger
                value="general"
                className="rounded-lg data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                General Blog
              </TabsTrigger>
              <TabsTrigger
                value="team"
                className="rounded-lg data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Team Insights
              </TabsTrigger>
            </TabsList>

            {/* Search Input */}
            <div className="mt-4 bg-gray-50 border border-gray-300 rounded-lg flex gap-2">
              <Search className="w-4 h-4 m-2" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg w-full hover:border-none focus:border-none outline-none"
              />
            </div>

            {/* GENERAL BLOGS (REAL) */}
            <TabsContent value="general" className="pt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filterBlogs(blogs).map((blog, index) => (
                  <BlogCard key={index} blog={blog} />
                ))}

                {filterBlogs(blogs).length === 0 && (
                  <p className="text-center text-gray-500 col-span-full py-12">
                    {blogs.length === 0
                      ? "Loading blogs or no blogs found..."
                      : "No matching blogs found."}
                  </p>
                )}
              </div>
            </TabsContent>

            {/* TEAM BLOGS (STATIC) */}
            <TabsContent value="team" className="pt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filterBlogs(teamBlogs).map((blog, index) => (
                  <BlogCard key={index} blog={blog} />
                ))}

                {filterBlogs(teamBlogs).length === 0 && (
                  <p className="text-center text-gray-500 col-span-full">
                    No results found.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
