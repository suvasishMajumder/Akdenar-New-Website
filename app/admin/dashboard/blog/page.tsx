import { BlogStatusToggle } from "@/components/admin/blog-status-toggle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/blog";
import { BlogRowActions } from "@/components/admin/blog-row-actions";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  await connectDB();

  const blogsRaw = await Blog.find().sort({ createdAt: -1 }).lean();

  const blogs = blogsRaw.map((blog) => ({
    ...blog,
    _id: (blog._id as any).toString(),
    createdAt: (blog.createdAt as any).toISOString(),
    publishedAt: blog.publishedAt
      ? (blog.publishedAt as any).toISOString()
      : null,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">
            Create, update, and manage your blog posts and articles.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/dashboard/blog/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Post
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No blog posts found.
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell className="font-medium max-w-[300px] truncate">
                    {blog.title}
                  </TableCell>
                  <TableCell>
                    <BlogStatusToggle
                      id={blog._id}
                      isPublished={blog.isPublished}
                    />
                  </TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell>
                    {blog.publishedAt
                      ? new Date(blog.publishedAt).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <BlogRowActions blog={blog} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
