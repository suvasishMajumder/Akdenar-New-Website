import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import connectDB from "@/lib/mongodb";
import { Contact } from "@/models/contact";
import { ContactRowActions } from "@/components/admin/contact-row-actions";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  await connectDB();

  const contactsRaw = await Contact.find().sort({ createdAt: -1 }).lean();

  const contacts = contactsRaw.map((contact) => ({
    ...contact,
    _id: (contact._id as any).toString(),
    createdAt: (contact.createdAt as any).toISOString(),
    // ensure other fields are strings if needed, though they should be fine
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
        <p className="text-muted-foreground">
          Manage and review inquiries from the contact form.
        </p>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No messages found.
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell>
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone || "-"}</TableCell>
                  <TableCell className="text-right">
                    <ContactRowActions contact={contact as any} />
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
