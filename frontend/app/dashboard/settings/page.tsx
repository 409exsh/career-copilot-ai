export default function SettingsPage() {
  const automationSettings = [
    "Auto-save matched jobs",
    "Draft cover letters",
    "Send weekly analytics summary",
  ];

  return (
    <main>
      <h1 className="mb-4 text-5xl font-bold">
        Settings
      </h1>

      <p className="mb-8 max-w-3xl text-gray-400">
        Configure job preferences, automation limits, and resume matching criteria.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <h2 className="mb-6 text-2xl font-bold">Job Preferences</h2>

          <div className="space-y-5">
            <label className="block">
              <span className="text-sm text-gray-400">Target Roles</span>
              <input className="mt-2 w-full rounded-xl border border-slate-800 bg-black px-4 py-3 text-white" defaultValue="Data Analyst, Business Analyst" />
            </label>

            <label className="block">
              <span className="text-sm text-gray-400">Preferred Location</span>
              <input className="mt-2 w-full rounded-xl border border-slate-800 bg-black px-4 py-3 text-white" defaultValue="Remote, Bengaluru, Hyderabad" />
            </label>

            <label className="block">
              <span className="text-sm text-gray-400">Minimum Match Score</span>
              <input className="mt-2 w-full rounded-xl border border-slate-800 bg-black px-4 py-3 text-white" defaultValue="80%" />
            </label>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <h2 className="mb-6 text-2xl font-bold">Automation</h2>

          <div className="space-y-4">
            {automationSettings.map((setting) => (
              <label key={setting} className="flex items-center justify-between rounded-2xl bg-black p-4">
                <span>{setting}</span>
                <input type="checkbox" className="h-5 w-5 accent-blue-500" defaultChecked />
              </label>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
