import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CircleDashed,
  Globe2,
  Network,
} from "lucide-react";

const platforms = [
  { name: "LinkedIn Jobs", status: "Connected", icon: Network },
  { name: "Indeed", status: "Connected", icon: Globe2 },
  { name: "Wellfound", status: "Ready", icon: BriefcaseBusiness },
  { name: "Naukri", status: "Ready", icon: Building2 },
  { name: "Greenhouse", status: "Connected", icon: CheckCircle2 },
  { name: "Lever", status: "Ready", icon: CircleDashed },
  { name: "Workday", status: "Review", icon: BriefcaseBusiness },
];

export default function PlatformGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {platforms.map((platform) => {
        const Icon = platform.icon;
        const connected = platform.status === "Connected";

        return (
          <article
            key={platform.name}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded-xl bg-white/5 p-3 text-cyan-300">
                <Icon size={22} />
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  connected
                    ? "bg-emerald-500/10 text-emerald-300"
                    : "bg-amber-500/10 text-amber-300"
                }`}
              >
                {platform.status}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
            <p className="mt-2 text-sm text-slate-400">
              Search, score, tailor, and submit applications with agent review controls.
            </p>
          </article>
        );
      })}
    </div>
  );
}
