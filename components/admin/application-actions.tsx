"use client";

import { Button } from "@/components/ui/button";
import { Eye, Trash } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Application {
  _id: string;
  fullName: string;
  phone: string;
  resumeUrl: string;
  coverLetter: string;
  createdAt: string;
  jobId: {
    title: string;
  } | null; // Populated
}

export function ApplicationRowActions({
  application,
}: {
  application: Application;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
            <span className="sr-only">View</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Applicant information and documents.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium leading-none mb-2">
                  Applicant
                </h4>
                <p className="text-sm text-foreground">
                  {application.fullName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {application.phone}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium leading-none mb-2">
                  Applying For
                </h4>
                <p className="text-sm text-foreground">
                  {application.jobId?.title || "Unknown Job"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Applied on{" "}
                  {new Date(application.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium leading-none mb-2">
                Cover Letter
              </h4>
              <div className="rounded-md bg-muted p-4 text-sm max-h-[200px] overflow-y-auto whitespace-pre-wrap">
                {application.coverLetter || "No cover letter provided."}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium leading-none mb-2">Resume</h4>
              <a
                href={application.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-blue-600 hover:underline"
              >
                View Resume Document
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
