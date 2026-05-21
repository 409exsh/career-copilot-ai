export default function ApplicationsPage() {
  const applications = [
    {
      company: "Google",
      role: "Data Analyst",
      match: "94%",
      status: "Applied",
      date: "Today",
    },
    {
      company: "Microsoft",
      role: "AI Operations Analyst",
      match: "91%",
      status: "Interview",
      date: "Yesterday",
    },
    {
      company: "Amazon",
      role: "Business Analyst",
      match: "88%",
      status: "Matched",
      date: "May 19",
    },
    {
      company: "Deloitte",
      role: "Data Consultant",
      match: "84%",
      status: "Draft",
      date: "May 18",
    },
  ];

  return (
    <main>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm uppercase tracking-widest text-blue-400">
            Pipeline
          </p>

          <h1 className="text-5xl font-bold">
            Applications
          </h1>
        </div>

        <button className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black transition hover:bg-cyan-300">
          Add Application
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { value: "248", label: "Applied" },
          { value: "18", label: "Interviews" },
          { value: "42", label: "Matched" },
          { value: "7", label: "Offers" },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <p className="text-3xl font-bold">{item.value}</p>
            <p className="text-gray-400">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950">
        <div className="grid min-w-[760px] grid-cols-5 gap-4 border-b border-slate-800 px-6 py-4 text-sm text-slate-400">
          <p>Company</p>
          <p>Role</p>
          <p>Match</p>
          <p>Status</p>
          <p>Date</p>
        </div>

        {applications.map((application) => (
          <div
            key={`${application.company}-${application.role}`}
            className="grid min-w-[760px] grid-cols-5 gap-4 border-b border-slate-900 px-6 py-5 last:border-b-0"
          >
            <p className="font-semibold">{application.company}</p>
            <p className="text-gray-300">{application.role}</p>
            <p className="text-blue-400">{application.match}</p>
            <p className="text-green-400">{application.status}</p>
            <p className="text-gray-400">{application.date}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
