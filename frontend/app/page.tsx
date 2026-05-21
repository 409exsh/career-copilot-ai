"use client";

import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  FileSearch,
  Layers3,
  LockKeyhole,
  Network,
  Sparkles,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import PlatformGrid from "@/components/PlatformGrid";

const features = [
  {
    title: "Resume Intelligence",
    text: "Parse resumes, extract skills, score ATS readiness, and map keywords to each target role.",
    icon: FileSearch,
  },
  {
    title: "Multi-Platform Engine",
    text: "Search LinkedIn, Indeed, Wellfound, Naukri, Greenhouse, Lever, and Workday from one command center.",
    icon: Network,
  },
  {
    title: "Autonomous Apply Agent",
    text: "Customize resumes, answer screening questions, draft cover letters, and queue submissions for approval.",
    icon: Bot,
  },
  {
    title: "Career Analytics",
    text: "Track match scores, interview rates, platform performance, and pipeline conversion over time.",
    icon: BarChart3,
  },
];

const steps = [
  "Upload resume",
  "Select target roles",
  "Define preferences",
  "Connect platforms",
  "Review AI applications",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-black/85 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="rounded-xl bg-cyan-400 p-2 text-black">
              <Sparkles size={20} />
            </span>
            <span className="text-xl font-semibold">Career Copilot AI</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#platforms" className="hover:text-white">Platforms</a>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/signin" className="hidden rounded-xl px-4 py-2 text-sm text-slate-300 hover:bg-slate-900 sm:block">
              Sign in
            </Link>
            <Link href="/dashboard" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-slate-200">
              Open Dashboard
            </Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid min-h-[760px] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-[1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
            <LockKeyhole size={16} />
            Human-approved AI job applications
          </div>

          <h1 className="max-w-5xl text-6xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            Your AI career agent for finding and applying to better jobs.
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-slate-300">
            Career Copilot AI turns your resume, role preferences, and connected job boards into a managed application pipeline with fit analysis, tailored resumes, screening answers, and analytics.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/dashboard/resume-ai" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-7 py-4 font-semibold text-black transition hover:bg-cyan-300">
              Upload Resume <ArrowRight size={18} />
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-7 py-4 font-semibold text-white transition hover:bg-slate-900">
              View Pricing
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-800 pt-8">
            {[
              ["7", "Job platforms"],
              ["92%", "Avg. match score"],
              ["4.8x", "Faster workflow"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="text-3xl font-semibold">{value}</p>
                <p className="mt-1 text-sm text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-[28px] border border-slate-800 bg-slate-950 p-4 shadow-2xl shadow-cyan-950/30"
        >
          <div className="rounded-3xl bg-black p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-300">Agent Mission</p>
                <h2 className="mt-1 text-2xl font-semibold">Apply to high-fit analyst roles</h2>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">Active</span>
            </div>

            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={index < 4 ? "text-emerald-300" : "text-slate-500"} size={20} />
                    <span>{step}</span>
                  </div>
                  <span className="text-sm text-slate-400">{index < 4 ? "Complete" : "Next"}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-cyan-400 p-5 text-black">
                <p className="text-sm font-medium">Best role match</p>
                <p className="mt-3 text-3xl font-semibold">94%</p>
              </div>
              <div className="rounded-2xl border border-slate-800 p-5">
                <p className="text-sm text-slate-400">Applications queued</p>
                <p className="mt-3 text-3xl font-semibold">12</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="features" className="border-y border-slate-800 bg-slate-950/60 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Core Features</p>
            <h2 className="mt-4 text-4xl font-semibold">Everything needed to run a modern job search operation.</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article key={feature.title} className="rounded-2xl border border-slate-800 bg-black p-6">
                  <span className="mb-6 inline-flex rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                    <Icon size={24} />
                  </span>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-4 leading-7 text-slate-400">{feature.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="platforms" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Job Engine</p>
            <h2 className="mt-4 text-4xl font-semibold">Connect every major job source.</h2>
          </div>
          <p className="max-w-xl text-slate-400">
            The platform is designed to support direct apply flows, ATS-hosted roles, screening questions, and approval-based submissions.
          </p>
        </div>

        <PlatformGrid />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {[
            { title: "Resume versions", value: "38", icon: Layers3 },
            { title: "Keyword gaps closed", value: "71%", icon: Target },
            { title: "Agent tasks completed", value: "1,284", icon: Bot },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
                <Icon className="text-cyan-300" size={28} />
                <p className="mt-8 text-5xl font-semibold">{item.value}</p>
                <p className="mt-3 text-slate-400">{item.title}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
