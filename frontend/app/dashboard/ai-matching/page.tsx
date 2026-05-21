"use client";

import {
  BriefcaseBusiness,
  CheckCircle2,
  Loader2,
  MapPin,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

type JobMatch = {
  id: string;
  title: string;
  company: string;
  platform: string;
  location: string;
  minExperience: number;
  skills: string[];
  salary: string;
  applyMode: string;
  fitScore: number;
  skillMatches: string[];
  missingSkills: string[];
  experienceReady: boolean;
  recommendation: string;
};

type ResumeSnapshot = {
  detectedSkills?: string[];
  targetRoles?: string[];
  yearsOfExperience?: number;
};

const platforms = [
  "LinkedIn Jobs",
  "Indeed",
  "Wellfound",
  "Naukri",
  "Greenhouse",
  "Lever",
  "Workday",
];

function getSavedResumeSnapshot(): ResumeSnapshot | null {
  if (typeof window === "undefined") return null;

  const savedAnalysis = window.localStorage.getItem("career-copilot-resume-analysis");

  if (!savedAnalysis) return null;

  try {
    return JSON.parse(savedAnalysis) as ResumeSnapshot;
  } catch {
    window.localStorage.removeItem("career-copilot-resume-analysis");
    return null;
  }
}

export default function AiMatchingPage() {
  const savedSnapshot = useMemo(() => getSavedResumeSnapshot(), []);
  const [role, setRole] = useState(savedSnapshot?.targetRoles?.[0] || "Data Analyst");
  const [yearsOfExperience, setYearsOfExperience] = useState(savedSnapshot?.yearsOfExperience || 2);
  const [location, setLocation] = useState("Remote");
  const [skills, setSkills] = useState(
    savedSnapshot?.detectedSkills?.length
      ? savedSnapshot.detectedSkills.join(", ")
      : "SQL, Python, Power BI, Excel, Data Analysis"
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState(platforms);
  const [jobs, setJobs] = useState<JobMatch[]>([]);
  const [queuedJobs, setQueuedJobs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const parsedSkills = useMemo(
    () =>
      skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    [skills]
  );

  async function searchJobs() {
    setLoading(true);
    setSearched(true);

    const response = await fetch("/api/search-jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        yearsOfExperience,
        skills: parsedSkills,
        location,
        platforms: selectedPlatforms,
      }),
    });

    const data = await response.json();
    setJobs(data.jobs);
    setLoading(false);
  }

  function togglePlatform(platform: string) {
    setSelectedPlatforms((current) =>
      current.includes(platform)
        ? current.filter((item) => item !== platform)
        : [...current, platform]
    );
  }

  function queueJob(jobId: string) {
    setQueuedJobs((current) => (current.includes(jobId) ? current : [...current, jobId]));
  }

  return (
    <main className="mx-auto max-w-7xl">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">AI Matching</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight">
          Search jobs by role, experience, and resume fit.
        </h1>
        <p className="mt-4 max-w-3xl text-slate-400">
          The agent reads your resume signals, searches supported platforms, scores fit, identifies missing keywords, and prepares applications for review.
        </p>
      </div>

      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-xl bg-cyan-500/10 p-3 text-cyan-300">
            <SlidersHorizontal size={22} />
          </span>
          <div>
            <h2 className="text-2xl font-semibold">Search Mission</h2>
            <p className="text-sm text-slate-400">Tune the role, experience, skills, location, and platform scope.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <label className="block">
            <span className="text-sm text-slate-400">Target Role</span>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-800 bg-black px-4 py-3 outline-none focus:border-cyan-400"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-400">Years of Experience</span>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-800 bg-black px-4 py-3 outline-none focus:border-cyan-400"
              min={0}
              max={25}
              type="number"
              value={yearsOfExperience}
              onChange={(event) => setYearsOfExperience(Number(event.target.value))}
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-400">Location</span>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-800 bg-black px-4 py-3 outline-none focus:border-cyan-400"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </label>

          <button
            onClick={searchJobs}
            className="mt-7 flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-black hover:bg-cyan-300"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
            Search Jobs
          </button>
        </div>

        <label className="mt-5 block">
          <span className="text-sm text-slate-400">Resume Skills</span>
          <textarea
            className="mt-2 min-h-24 w-full rounded-2xl border border-slate-800 bg-black px-4 py-3 outline-none focus:border-cyan-400"
            value={skills}
            onChange={(event) => setSkills(event.target.value)}
          />
        </label>

        <div className="mt-5 flex flex-wrap gap-2">
          {platforms.map((platform) => {
            const selected = selectedPlatforms.includes(platform);

            return (
              <button
                key={platform}
                onClick={() => togglePlatform(platform)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  selected
                    ? "border-cyan-400 bg-cyan-400 text-black"
                    : "border-slate-800 text-slate-300 hover:bg-black"
                }`}
              >
                {platform}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          ["Platforms", selectedPlatforms.length.toString()],
          ["Skills", parsedSkills.length.toString()],
          ["Queued", queuedJobs.length.toString()],
          ["Results", jobs.length.toString()],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-4xl font-semibold">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 space-y-5">
        {!searched && (
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 text-slate-300">
            Upload a resume on Resume AI, or enter the role and experience here, then run a search mission.
          </div>
        )}

        {jobs.map((job) => (
          <article key={job.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                  <span className="flex items-center gap-2">
                    <BriefcaseBusiness size={16} />
                    {job.platform}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={16} />
                    {job.location}
                  </span>
                  <span>{job.salary}</span>
                </div>

                <h2 className="text-2xl font-semibold">{job.title}</h2>
                <p className="mt-1 text-slate-400">{job.company}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-2xl bg-cyan-400 px-5 py-3 text-center text-black">
                  <p className="text-2xl font-semibold">{job.fitScore}%</p>
                  <p className="text-xs font-medium uppercase">Fit</p>
                </div>

                <button
                  onClick={() => queueJob(job.id)}
                  className="flex items-center gap-2 rounded-2xl bg-white px-5 py-4 font-semibold text-black hover:bg-slate-200"
                >
                  {queuedJobs.includes(job.id) ? <CheckCircle2 size={18} /> : <Send size={18} />}
                  {queuedJobs.includes(job.id) ? "Queued" : "Queue Apply"}
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="rounded-2xl bg-black p-5">
                <p className="mb-3 flex items-center gap-2 font-semibold text-emerald-300">
                  <Sparkles size={18} />
                  Match Reasons
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.skillMatches.map((skill) => (
                    <span key={skill} className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-black p-5">
                <p className="mb-3 font-semibold text-amber-300">Missing Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {job.missingSkills.map((skill) => (
                    <span key={skill} className="rounded-full bg-amber-500/10 px-3 py-1 text-sm text-amber-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-black p-5">
                <p className="font-semibold">Agent Action</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {job.recommendation}. Minimum experience: {job.minExperience}+ years.
                  Apply mode: {job.applyMode}.
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
