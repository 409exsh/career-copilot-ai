import { CheckCircle2, Clock3, Sparkles } from "lucide-react";

const activities = [
  {
    title: "Scanned 183 new jobs",
    detail: "Filtered by Data Analyst, AI Operations, remote-first, and salary preferences.",
    status: "Done",
  },
  {
    title: "Rewrote resume summary",
    detail: "Aligned keywords with SQL, Power BI, automation, and stakeholder reporting.",
    status: "Done",
  },
  {
    title: "Drafted Workday answers",
    detail: "Prepared responses for eligibility, relocation, and experience questions.",
    status: "Review",
  },
  {
    title: "Queued 12 applications",
    detail: "Waiting for your approval before submitting to LinkedIn and Greenhouse.",
    status: "Pending",
  },
];

export default function AgentActivity() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">AI Agent</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Live Work Queue</h2>
        </div>

        <span className="rounded-xl bg-cyan-500/10 p-3 text-cyan-300">
          <Sparkles size={22} />
        </span>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.title} className="flex gap-4 rounded-2xl bg-black p-4">
            <span className="mt-1 text-cyan-300">
              {activity.status === "Done" ? <CheckCircle2 size={20} /> : <Clock3 size={20} />}
            </span>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-semibold text-white">{activity.title}</h3>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                  {activity.status}
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-400">{activity.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
