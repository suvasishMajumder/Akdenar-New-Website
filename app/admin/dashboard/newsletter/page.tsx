import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import connectDB from "@/lib/mongodb";
import { Newsletter } from "@/models/newsletter";
import { Mail } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NewsletterPage() {
  await connectDB();

  const subscribersRaw = await Newsletter.find()
    .sort({ subscribedAt: -1 })
    .lean();

  const subscribers = subscribersRaw.map((subscriber) => ({
    ...subscriber,
    _id: (subscriber._id as any).toString(),
    subscribedAt: (subscriber.subscribedAt as any).toISOString(),
  }));

  const activeCount = subscribers.filter((s) => s.isActive).length;
  const inactiveCount = subscribers.length - activeCount;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Newsletter Subscribers
        </h1>
        <p className="text-muted-foreground">
          Manage and view all newsletter subscriptions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-muted-foreground">
              Total Subscribers
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold">{subscribers.length}</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <h3 className="text-sm font-medium text-muted-foreground">
              Active
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {activeCount}
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-gray-400" />
            <h3 className="text-sm font-medium text-muted-foreground">
              Inactive
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-600">
            {inactiveCount}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subscribed Date</TableHead>
              <TableHead>Subscribed Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No subscribers found.
                </TableCell>
              </TableRow>
            ) : (
              subscribers.map((subscriber) => (
                <TableRow key={subscriber._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {subscriber.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    {subscriber.isActive ? (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(subscriber.subscribedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(subscriber.subscribedAt).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
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
