import { NextResponse } from "next/server";

type SearchRequest = {
  role: string;
  yearsOfExperience: number;
  skills: string[];
  location: string;
  platforms: string[];
};

const jobs = [
  {
    id: "job-001",
    title: "Data Analyst",
    company: "Google",
    platform: "LinkedIn Jobs",
    location: "Bengaluru",
    minExperience: 2,
    skills: ["SQL", "Python", "Tableau", "Statistics", "Communication"],
    salary: "$92k-$128k",
    applyMode: "Easy Apply",
  },
  {
    id: "job-002",
    title: "Business Analyst",
    company: "Microsoft",
    platform: "Indeed",
    location: "Remote",
    minExperience: 1,
    skills: ["Excel", "Power BI", "SQL", "Stakeholder Management"],
    salary: "$82k-$118k",
    applyMode: "Questionnaire",
  },
  {
    id: "job-003",
    title: "AI Operations Analyst",
    company: "OpenGrid Systems",
    platform: "Wellfound",
    location: "Remote",
    minExperience: 3,
    skills: ["Python", "Automation", "Data Analysis", "Communication"],
    salary: "$95k-$135k",
    applyMode: "Founder Review",
  },
  {
    id: "job-004",
    title: "Data Consultant",
    company: "Deloitte",
    platform: "Naukri",
    location: "Hyderabad",
    minExperience: 2,
    skills: ["SQL", "Power BI", "Excel", "Problem Solving"],
    salary: "INR 14L-24L",
    applyMode: "Recruiter Apply",
  },
  {
    id: "job-005",
    title: "Product Analyst",
    company: "Stripe",
    platform: "Greenhouse",
    location: "Remote",
    minExperience: 3,
    skills: ["SQL", "Statistics", "Data Analysis", "Communication"],
    salary: "$110k-$150k",
    applyMode: "ATS Apply",
  },
  {
    id: "job-006",
    title: "Frontend Developer",
    company: "Canva",
    platform: "Lever",
    location: "Remote",
    minExperience: 2,
    skills: ["React", "Next.js", "JavaScript", "CSS"],
    salary: "$100k-$145k",
    applyMode: "ATS Apply",
  },
  {
    id: "job-007",
    title: "Machine Learning Engineer",
    company: "Adobe",
    platform: "Workday",
    location: "Noida",
    minExperience: 4,
    skills: ["Python", "Machine Learning", "Statistics", "AWS"],
    salary: "INR 28L-45L",
    applyMode: "Workday Flow",
  },
];

function getRoleScore(jobTitle: string, requestedRole: string) {
  const title = jobTitle.toLowerCase();
  const role = requestedRole.toLowerCase();

  if (title === role) return 35;
  if (title.includes(role) || role.includes(title)) return 28;

  const roleWords = role.split(/\s+/);
  return roleWords.some((word) => title.includes(word)) ? 18 : 0;
}

export async function POST(req: Request) {
  const body = (await req.json()) as SearchRequest;
  const selectedPlatforms = body.platforms.length > 0 ? body.platforms : jobs.map((job) => job.platform);
  const normalizedLocation = body.location.trim().toLowerCase();

  const rankedJobs = jobs
    .filter((job) => selectedPlatforms.includes(job.platform))
    .filter((job) => {
      if (!normalizedLocation || normalizedLocation === "anywhere") return true;
      return job.location.toLowerCase().includes(normalizedLocation) || job.location.toLowerCase() === "remote";
    })
    .map((job) => {
      const skillMatches = job.skills.filter((skill) =>
        body.skills.some((candidateSkill) => candidateSkill.toLowerCase() === skill.toLowerCase())
      );
      const missingSkills = job.skills.filter((skill) => !skillMatches.includes(skill));
      const experienceReady = body.yearsOfExperience >= job.minExperience;
      const roleScore = getRoleScore(job.title, body.role);
      const skillScore = Math.min(35, skillMatches.length * 9);
      const experienceScore = experienceReady ? 20 : Math.max(0, 12 - (job.minExperience - body.yearsOfExperience) * 4);
      const platformScore = selectedPlatforms.includes(job.platform) ? 10 : 0;
      const fitScore = Math.min(98, roleScore + skillScore + experienceScore + platformScore);

      return {
        ...job,
        fitScore,
        skillMatches,
        missingSkills,
        experienceReady,
        recommendation:
          fitScore >= 80
            ? "Ready to apply"
            : fitScore >= 65
              ? "Tailor resume first"
              : "Save for later",
      };
    })
    .sort((a, b) => b.fitScore - a.fitScore);

  return NextResponse.json({
    jobs: rankedJobs,
    searchSummary: {
      role: body.role,
      yearsOfExperience: body.yearsOfExperience,
      platformsSearched: selectedPlatforms.length,
      jobsFound: rankedJobs.length,
    },
  });
}
