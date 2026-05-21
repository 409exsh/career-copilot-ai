import mammoth from "mammoth";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";

export const runtime = "nodejs";

const SKILLS_DATABASE = [
  "Python",
  "SQL",
  "Power BI",
  "Excel",
  "Tableau",
  "AWS",
  "Java",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Machine Learning",
  "Data Analysis",
  "Statistics",
  "HTML",
  "CSS",
  "MongoDB",
  "PostgreSQL",
  "Git",
  "Docker",
  "Communication",
  "Leadership",
  "Problem Solving",
];

const ROLE_PATTERNS = [
  "Data Analyst",
  "Business Analyst",
  "AI Operations Analyst",
  "Software Engineer",
  "Frontend Developer",
  "Full Stack Developer",
  "Machine Learning Engineer",
  "Product Analyst",
  "Data Scientist",
  "Project Manager",
];

async function extractResumeText(file: File) {
  const fileName = file.name.toLowerCase();
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  if (file.type === "application/pdf" || fileName.endsWith(".pdf")) {
    PDFParse.setWorker(
      pathToFileURL(
        join(process.cwd(), "node_modules", "pdf-parse", "dist", "worker", "pdf.worker.mjs")
      ).href
    );

    const parser = new PDFParse({ data: fileBuffer });

    try {
      const result = await parser.getText();
      return result.text;
    } finally {
      await parser.destroy();
    }
  }

  if (
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx")
  ) {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value;
  }

  return file.text();
}

function inferYearsOfExperience(text: string) {
  const matches = [...text.matchAll(/(\d{1,2})\+?\s*(?:years|yrs|year)\s+(?:of\s+)?experience/gi)];

  if (matches.length === 0) {
    return 0;
  }

  return Math.max(...matches.map((match) => Number(match[1])));
}

function inferTargetRoles(text: string, detectedSkills: string[]) {
  const normalizedText = text.toLowerCase();
  const directRoles = ROLE_PATTERNS.filter((role) =>
    normalizedText.includes(role.toLowerCase())
  );

  if (directRoles.length > 0) {
    return directRoles.slice(0, 4);
  }

  if (detectedSkills.some((skill) => ["SQL", "Power BI", "Excel", "Tableau", "Data Analysis"].includes(skill))) {
    return ["Data Analyst", "Business Analyst", "Product Analyst"];
  }

  if (detectedSkills.some((skill) => ["React", "Next.js", "Node.js", "JavaScript"].includes(skill))) {
    return ["Frontend Developer", "Full Stack Developer", "Software Engineer"];
  }

  if (detectedSkills.some((skill) => ["Python", "Machine Learning", "Statistics"].includes(skill))) {
    return ["Data Scientist", "Machine Learning Engineer", "AI Operations Analyst"];
  }

  return ["Data Analyst", "Business Analyst"];
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const text = await extractResumeText(file);

    if (!text.trim()) {
      return NextResponse.json(
        { error: "Could not read text from this resume" },
        { status: 400 }
      );
    }

    const normalizedText = text.toLowerCase();
    const detectedSkills = SKILLS_DATABASE.filter((skill) =>
      normalizedText.includes(skill.toLowerCase())
    );

    const missingSkills = SKILLS_DATABASE.filter(
      (skill) => !detectedSkills.includes(skill)
    ).slice(0, 5);

    const yearsOfExperience = inferYearsOfExperience(text);
    const targetRoles = inferTargetRoles(text, detectedSkills);

    const atsScore = Math.min(100, detectedSkills.length * 12);

    const suggestions = [
      "Add more measurable achievements",
      "Include more industry keywords",
      "Add certifications and tools",
      "Improve project descriptions",
    ];

    return NextResponse.json({
      success: true,
      atsScore,
      detectedSkills,
      missingSkills,
      targetRoles,
      yearsOfExperience,
      suggestions,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Server error while analyzing resume" },
      { status: 500 }
    );
  }
}
