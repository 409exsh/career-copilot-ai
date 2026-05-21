import AgentActivity from "@/components/AgentActivity";
import ApplicationChart from "@/components/ApplicationChart";
import MetricCard from "@/components/MetricCard";
import PlatformGrid from "@/components/PlatformGrid";
import {
  BarChart3,
  BriefcaseBusiness,
  FileCheck2,
  Target,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Command Center</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight">
            Job Search Dashboard
          </h1>
          <p className="mt-4 max-w-3xl text-slate-400">
            Monitor your AI agent, resume fit, platform connections, and application pipeline from one workspace.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold hover:bg-slate-900">
            Review Queue
          </button>
          <button className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black hover:bg-cyan-300">
            New Mission
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Applications" value="248" change="+31 this week" icon={BriefcaseBusiness} />
        <MetricCard title="Interviews" value="18" change="+5 this month" icon={FileCheck2} />
        <MetricCard title="Avg. Match" value="89%" change="+12% after tuning" icon={Target} />
        <MetricCard title="Conversion" value="7.2%" change="+1.8% vs last month" icon={BarChart3} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.85fr]">
        <ApplicationChart />
        <AgentActivity />
      </div>

      <section className="mt-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Connected Job Platforms</h2>
            <p className="mt-2 text-slate-400">Search, score, and apply across every supported source.</p>
          </div>
        </div>

        <PlatformGrid />
      </section>
    </div>
  );
}
