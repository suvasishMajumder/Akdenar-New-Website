"use client";

import * as React from "react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { NavProjects } from "./nav-project";

// This is sample data.
import { Mail, Briefcase, Newspaper, FileText } from "lucide-react";

const data = {
  projects: [
    {
      name: "Contact",
      url: "/admin/dashboard/contact",
      icon: Mail,
    },

    {
      name: "Job Application",
      url: "/admin/dashboard/jobs",
      icon: Briefcase,
    },

    {
      name: "Applications",
      url: "/admin/dashboard/applications",
      icon: FileText,
    },

    {
      name: "Blog",
      url: "/admin/dashboard/blog",
      icon: Newspaper,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="mt-20">
        <NavProjects projects={data.projects} />
      </SidebarContent>
    </Sidebar>
  );
}
