import { ArrowRight, LockKeyhole, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-black text-white lg:grid-cols-[0.95fr_1.05fr]">
      <section className="flex flex-col justify-between border-r border-slate-800 bg-slate-950 p-10">
        <Link href="/" className="flex items-center gap-3 text-xl font-semibold">
          <span className="rounded-xl bg-cyan-400 p-2 text-black">
            <Sparkles size={20} />
          </span>
          Career Copilot AI
        </Link>

        <div className="my-16 max-w-xl">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Secure Workspace</p>
          <h1 className="mt-5 text-5xl font-semibold leading-tight">
            Sign in to manage your AI job search command center.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            Resume data, platform connections, and application drafts stay inside your account workspace.
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-400">
          <LockKeyhole size={18} />
          OAuth and passwordless authentication ready for integration.
        </div>
      </section>

      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <h2 className="text-3xl font-semibold">Welcome back</h2>
          <p className="mt-3 text-slate-400">Continue building your application pipeline.</p>

          <form className="mt-8 space-y-5">
            <label className="block">
              <span className="text-sm text-slate-400">Email</span>
              <input className="mt-2 w-full rounded-2xl border border-slate-800 bg-black px-4 py-4 outline-none focus:border-cyan-400" placeholder="you@example.com" type="email" />
            </label>

            <label className="block">
              <span className="text-sm text-slate-400">Password</span>
              <input className="mt-2 w-full rounded-2xl border border-slate-800 bg-black px-4 py-4 outline-none focus:border-cyan-400" placeholder="Enter password" type="password" />
            </label>

            <Link href="/dashboard" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 py-4 font-semibold text-black hover:bg-cyan-300">
              Sign in <ArrowRight size={18} />
            </Link>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            New here? <Link href="/pricing" className="text-cyan-300">Choose a plan</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
