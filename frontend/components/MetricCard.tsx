import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
};

export default function MetricCard({
  title,
  value,
  change,
  icon: Icon,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        <span className="rounded-lg bg-cyan-500/10 p-2 text-cyan-300">
          <Icon size={18} />
        </span>
      </div>

      <p className="text-4xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-3 text-sm text-emerald-300">{change}</p>
    </div>
  );
}
