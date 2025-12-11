"use client";

import { useRouter } from "next/navigation";
import { BlogForm } from "@/components/admin/blog-form";

export default function CreateBlogPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Blog Post</h1>
        <p className="text-muted-foreground">
          Add a new blog post to your site.
        </p>
      </div>

      <div className="rounded-md border p-6 bg-background">
        <BlogForm onSuccess={() => router.push("/admin/dashboard/blog")} />
      </div>
    </div>
  );
}
