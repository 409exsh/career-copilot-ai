"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Briefcase,
  Brain,
  BarChart3,
  FileText,
  Settings,
  PlugZap,
  Sparkles,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Applications",
    href: "/dashboard/applications",
    icon: Briefcase,
  },
  {
    name: "AI Matching",
    href: "/dashboard/ai-matching",
    icon: Brain,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "Platforms",
    href: "/dashboard/platforms",
    icon: PlugZap,
  },
  {
    name: "Resume AI",
    href: "/dashboard/resume-ai",
    icon: FileText,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 border-r border-slate-800 bg-slate-950 p-6 lg:block">

      <div className="mb-10 flex items-center gap-3">
        <span className="rounded-xl bg-cyan-400 p-2 text-black">
          <Sparkles size={20} />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-white">Career Copilot</h2>
          <p className="text-xs text-slate-400">AI Job Agent</p>
        </div>
      </div>

      <div className="space-y-3">

        {navItems.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition
              ${
                active
                  ? "bg-white text-black font-semibold"
                  : "text-slate-400 hover:bg-black hover:text-white"
              }`}
            >
              <Icon size={22} />
              <span>{item.name}</span>
            </Link>
          );
        })}

      </div>

    </aside>
  );
}
