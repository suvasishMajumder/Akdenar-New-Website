"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download } from "lucide-react";

interface Application {
  _id: string;
  jobId: {
    _id: string;
    title: string;
    location: string;
    type: string;
  };
  fullName: string;
  phone: string;
  resumeUrl: string;
  coverLetter: string;
  createdAt: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications");
      const data = await response.json();
      if (data.success) {
        setApplications(data.data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Job Applications</h1>
        <p className="text-gray-600 mt-2">
          Total Applications: {applications.length}
        </p>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500">No applications yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app._id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <span className="text-xl">{app.fullName}</span>
                    <span className="text-sm text-gray-500 ml-3">
                      Applied for: {app.jobId?.title || "Unknown Job"}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{app.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Job Location</p>
                    <p className="font-medium">
                      {app.jobId?.location || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Job Type</p>
                    <p className="font-medium">{app.jobId?.type || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Resume</p>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="mt-1"
                    >
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Resume
                      </a>
                    </Button>
                  </div>
                </div>
                {app.coverLetter && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-1">Cover Letter</p>
                    <p className="text-sm bg-gray-50 p-3 rounded-md">
                      {app.coverLetter}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
