import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen bg-black text-white">

      <Sidebar />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 lg:hidden">
          <Link href="/dashboard" className="font-semibold">Career Copilot</Link>
          <Link href="/dashboard/resume-ai" className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-black">
            Upload Resume
          </Link>
        </div>

        <div className="p-5 md:p-8">
        {children}
        </div>
      </div>

    </main>
  );
}
