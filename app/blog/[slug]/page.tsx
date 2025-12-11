import type { Metadata } from "next";
import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/blog";
import Footer from "@/components/Footer";

// Force Next.js to not cache this if you expect frequent updates, or use revalidate.
export const revalidate = 60; // Revalidate every minute

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug });

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const canonicalUrl =
    blog.canonicalUrl && blog.canonicalUrl.length > 0
      ? blog.canonicalUrl
      : `${baseUrl}/blog/${slug}`;

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.shortDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.shortDescription,
      type: "article",
      publishedTime: blog.publishedAt
        ? new Date(blog.publishedAt).toISOString()
        : undefined,
      authors: [blog.author || "Akdenar"],
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  };
}

export default async function BlogDetailPage(props: Props) {
  const params = await props.params;

  await connectDB();

  // Find blog by slug
  const blog = await Blog.findOne({ slug: params.slug });

  if (!blog) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] min-h-[400px]">
          {blog.coverImage ? (
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gray-900" />
          )}

          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full text-center text-white space-y-6">
              <div className="flex items-center justify-center gap-4 text-sm md:text-base font-medium text-white/80">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full">
                  {blog.tags?.[0] || "Blog"}
                </span>
                <span>•</span>
                <span>
                  {blog.publishedAt
                    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Draft"}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {blog.title}
              </h1>

              {blog.author && (
                <p className="text-lg text-white/90">
                  By <span className="font-semibold">{blog.author}</span>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <article className="max-w-3xl mx-auto px-6 py-12 md:py-20">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
