import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import connectDB from "@/lib/mongodb";
import Job from "@/models/job";
import { JobRowActions } from "@/components/admin/job-row-actions";
import { CreateJobDialog } from "@/components/admin/create-job-dialog";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  await connectDB();

  const jobsRaw = await Job.find({}).sort({ createdAt: -1 }).lean();

  const jobs = jobsRaw.map((job) => ({
    ...job,
    _id: (job._id as any).toString(),
    createdAt: (job.createdAt as any)?.toISOString(),
    updatedAt: (job.updatedAt as any)?.toISOString(),
    postedAt: (job.postedAt as any)?.toISOString(),
    deadline: (job.deadline as any)
      ? (job.deadline as any).toISOString()
      : null,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
          <p className="text-muted-foreground">
            Manage job listings, create new openings, and track applications.
          </p>
        </div>
        <CreateJobDialog />
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No jobs found.
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{job.employmentType}</Badge>
                  </TableCell>
                  <TableCell>
                    {job.postedAt
                      ? new Date(job.postedAt).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {job.deadline
                      ? new Date(job.deadline).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <JobRowActions job={job} />
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
