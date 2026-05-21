import ApplicationChart from "@/components/ApplicationChart";

export default function AnalyticsPage() {
  const platforms = [
    ["LinkedIn", "126 applications", "11 interviews"],
    ["Indeed", "74 applications", "4 interviews"],
    ["Naukri", "48 applications", "3 interviews"],
  ];

  return (
    <main>
      <h1 className="mb-4 text-5xl font-bold">
        Analytics
      </h1>

      <p className="mb-8 max-w-3xl text-gray-400">
        Monitor application volume, interview conversion, and where your job search is performing best.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
          <p className="text-gray-400">Interview Rate</p>
          <p className="mt-2 text-5xl font-bold">7.2%</p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
          <p className="text-gray-400">Avg. Match Score</p>
          <p className="mt-2 text-5xl font-bold">89%</p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
          <p className="text-gray-400">Top Platform</p>
          <p className="mt-2 text-5xl font-bold">LinkedIn</p>
        </div>
      </div>

      <ApplicationChart />

      <div className="mt-8 overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950 p-6">
        <h2 className="mb-6 text-2xl font-bold">Platform Performance</h2>

        {platforms.map(([platform, applications, interviews]) => (
          <div key={platform} className="grid min-w-[620px] grid-cols-3 border-b border-slate-900 py-4 last:border-b-0">
            <p className="font-semibold">{platform}</p>
            <p className="text-gray-400">{applications}</p>
            <p className="text-green-400">{interviews}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
