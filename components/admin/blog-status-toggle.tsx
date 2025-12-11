"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function BlogStatusToggle({
  id,
  isPublished,
}: {
  id: string;
  isPublished: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleValueChange = (value: string) => {
    const newStatus = value === "published";
    startTransition(async () => {
      try {
        await fetch(`/api/blog/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ isPublished: newStatus }),
          headers: { "Content-Type": "application/json" },
        });
        router.refresh();
      } catch (e) {
        console.error(e);
      }
    });
  };

  return (
    <Select
      defaultValue={isPublished ? "published" : "draft"}
      onValueChange={handleValueChange}
      disabled={isPending}
    >
      <SelectTrigger
        className="w-[120px] h-8"
        onClick={(e) => e.stopPropagation()}
      >
        {isPending ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : null}
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent className="z-[999]">
        <SelectItem value="published">
          <span className="text-green-600 font-medium">Published</span>
        </SelectItem>
        <SelectItem value="draft">
          <span className="text-slate-500 font-medium">Draft</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
