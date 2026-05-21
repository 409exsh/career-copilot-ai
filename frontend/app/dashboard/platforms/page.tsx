import PlatformGrid from "@/components/PlatformGrid";
import { ShieldCheck } from "lucide-react";

export default function PlatformsPage() {
  return (
    <main className="mx-auto max-w-7xl">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Integrations</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight">
          Job Platforms
        </h1>
        <p className="mt-4 max-w-3xl text-slate-400">
          Connect job boards and ATS platforms so the AI agent can search roles, analyze fit, draft answers, and queue applications for approval.
        </p>
      </div>

      <PlatformGrid />

      <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-950 p-8">
        <div className="flex items-start gap-4">
          <span className="rounded-xl bg-emerald-500/10 p-3 text-emerald-300">
            <ShieldCheck size={24} />
          </span>

          <div>
            <h2 className="text-2xl font-semibold">Human approval mode</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-400">
              Automatic application flows should stay approval-based. The agent can prepare tailored resumes, cover letters, and screening answers, while final submission remains under your control.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-slate-800 bg-slate-950 p-8">
        <h2 className="text-2xl font-semibold">Connector status</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-400">
          This build includes local connector simulation for job discovery, fit scoring, and application queueing. Production connections should use official partner APIs, OAuth, email-based job alerts, or approved ATS integrations for each platform.
        </p>
      </section>
    </main>
  );
}
